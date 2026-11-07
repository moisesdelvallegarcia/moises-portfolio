#!/bin/sh
# Vigila el buzón de la página de Maciel (/demos/maciel/#buzon).
# Imprime una línea "PEDIDO <id> | autor | texto" por cada pedido nuevo (para usar con Monitor).
# Lo hecho se anota en public/demos/maciel/buzon.json: {autor, texto, estado, respuesta, fecha}.
TOPIC=https://ntfy.sh/maciel-buzon-f233a4b2f3
while true; do
  curl -sN "$TOPIC/json" | while read -r l; do
    printf '%s' "$l" | jq -r 'select(.event=="message") | .id as $i | (.message | fromjson? // {autor:"?",texto:.}) | "PEDIDO \($i) | \(.autor) | \(.texto | gsub("\\s+";" "))"' 2>/dev/null
  done
  sleep 5
done
