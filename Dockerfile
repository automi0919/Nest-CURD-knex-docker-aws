FROM public.ecr.aws/lambda/nodejs:14
  
RUN yum -y update && \
    yum install -y \
    g++ \
    make \
    gzip \
    cmake \
    unzip \
    libcurl4-openssl-dev \
    tar

ENV TEMP_DIR=/tmp/.lambdas/test

RUN mkdir -p $TEMP_DIR

WORKDIR ${TEMP_DIR}

# COPY package*.json ./
COPY package.json ./
# COPY package-lock.json ./
RUN npm i
# RUN mkdir node_modules
# RUN npm ci --only=development
# RUN npm install aws-lambda-ric

# RUN mkdir deploy
COPY . .
RUN npm run build
# RUN npm prune --production # uncomment for production
# RUN zip -r $PROJECT_PATH/nest-lambda.zip . ../node_modules
RUN ls -ltr
RUN cd .. && ls -ltr

RUN cp -r $TEMP_DIR/dist/. ${LAMBDA_TASK_ROOT}/
RUN cp -r $TEMP_DIR/node_modules ${LAMBDA_TASK_ROOT}/
RUN cp -r $TEMP_DIR/src/certs ${LAMBDA_TASK_ROOT}/src/
RUN cp -r $TEMP_DIR/.env ${LAMBDA_TASK_ROOT}/

RUN npm cache clean --force

WORKDIR ${LAMBDA_TASK_ROOT}

CMD [ "index.handler" ]

