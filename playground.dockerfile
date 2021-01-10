FROM node:14 AS development
WORKDIR /opt
COPY . .
RUN curl -L https://unpkg.com/@pnpm/self-installer | node
RUN pnpm install --frozen-lockfile && pnpm run build && \
    cd ./playground && pnpm run export

FROM nginx:alpine AS production
COPY --from=development /opt/playground/out /usr/share/nginx/html