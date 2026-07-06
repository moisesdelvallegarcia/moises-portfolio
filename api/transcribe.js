export const config = {
  runtime: "edge",
};

const SUPPORTED_MODELS = new Set([
  "gpt-4o-mini-transcribe",
  "gpt-4o-transcribe",
  "whisper-1",
]);

const LANGUAGE_MAP = {
  "en-US": "en",
  "es-MX": "es",
  "es-US": "es",
};

export default async function handler(request) {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return jsonResponse(
      { error: "OPENAI_API_KEY is not configured on the server." },
      500
    );
  }

  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio");
    const requestedModel = String(formData.get("model") || "gpt-4o-mini-transcribe");
    const requestedLanguage = String(formData.get("language") || "");

    if (!audioFile || typeof audioFile === "string") {
      return jsonResponse({ error: "Audio file is required." }, 400);
    }

    if (audioFile.size > 25 * 1024 * 1024) {
      return jsonResponse({ error: "Audio files must be under 25 MB." }, 400);
    }

    const model = SUPPORTED_MODELS.has(requestedModel)
      ? requestedModel
      : "gpt-4o-mini-transcribe";

    const upstreamForm = new FormData();
    upstreamForm.append("file", audioFile, audioFile.name || "audio-file");
    upstreamForm.append("model", model);

    const language = LANGUAGE_MAP[requestedLanguage];
    if (language) upstreamForm.append("language", language);

    if (model === "whisper-1") {
      upstreamForm.append("response_format", "json");
    }

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: upstreamForm,
    });

    const responseText = await response.text();
    let payload;

    try {
      payload = JSON.parse(responseText);
    } catch {
      payload = { text: responseText };
    }

    if (!response.ok) {
      return jsonResponse(
        {
          error:
            payload?.error?.message ||
            payload?.message ||
            "OpenAI transcription request failed.",
        },
        response.status
      );
    }

    return jsonResponse({
      text: payload.text || "",
      model,
      language: language || "auto",
      usage: payload.usage || null,
    });
  } catch (error) {
    return jsonResponse({ error: error.message || "Unexpected server error." }, 500);
  }
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
