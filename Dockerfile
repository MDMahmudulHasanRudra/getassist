# syntax=docker/dockerfile:1
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Production images refuse to build while [[OWNER: ...]] placeholders remain.
# Staging only: --build-arg ALLOW_PLACEHOLDERS=1
ARG ALLOW_PLACEHOLDERS=0
RUN npm run build \
  && npm run check:output \
  && if [ "$ALLOW_PLACEHOLDERS" = "1" ]; then echo "Placeholders allowed (staging build)"; \
     else npm run check:placeholders; fi

FROM nginxinc/nginx-unprivileged:stable-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
