FROM registry.gitlab.com/smoores/storyteller-base:latest

COPY --chown=node package.json yarn.lock .yarnrc.yml ./
COPY --chown=node .yarn/releases ./.yarn/releases
COPY --chown=node .yarn/cache ./.yarn/cache
COPY --chown=node web/package.json ./web/package.json

RUN yarn workspaces focus @storyteller/web
# While using async/await fork:
RUN npm rebuild --build-from-source sqlite3

COPY --chown=node . .

RUN gcc -g -fPIC -rdynamic -shared web/sqlite/uuid.c -o web/sqlite/uuid.c.so

ENV NEXT_TELEMETRY_DISABLED 1

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build:web

EXPOSE 8001

ENV PORT 8001
ENV HOST 0.0.0.0
# ENV NEXT_SHARP_PATH /app/node_modules/sharp
ENV STORYTELLER_DATA_DIR /data

CMD yarn workspace @storyteller/web start
