# Clínica Rejuvence — landing page

Landing page estática, responsiva e sem dependências de framework. Pode ser publicada diretamente na Vercel, Netlify, Cloudflare Pages ou GitHub Pages.

## Abrir localmente

Abra `index.html` no navegador. Para testar o mapa e todos os recursos com menos restrições, execute um servidor local na pasta:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Antes de publicar

1. Confirme o WhatsApp em `script.js`, na propriedade `SITE_CONFIG.whatsappNumber`.
   - O template está preenchido com `55 88 9603-7760`, encontrado em um diretório público, mas não confirmado diretamente com a clínica.
2. Confirme o Coren exibido na seção da profissional.
3. Confirme o endereço e, de preferência, substitua o link por um pino exato do Google Maps.
4. Troque as imagens recortadas pelas fotografias originais sem textos e elementos do Instagram quando estiverem disponíveis.
5. Revise a lista de cuidados oferecidos antes de divulgar.

## Personalizações rápidas

- Paleta e fontes: início de `styles.css`, dentro de `:root`.
- Textos e seções: `index.html`.
- Conteúdo dos cuidados: objeto `careContent` em `script.js`.
- WhatsApp e nome: objeto `SITE_CONFIG` em `script.js`.

## Recursos incluídos

- Design editorial próprio e responsivo.
- Animações de entrada, rolagem, parallax e linha de assinatura.
- Menu mobile.
- Abas interativas de cuidados.
- Questionário que monta uma mensagem personalizada para o WhatsApp.
- FAQ expansível.
- Mapa e link de rota.
- SEO básico e dados estruturados.
- Acessibilidade para teclado e suporte a `prefers-reduced-motion`.
