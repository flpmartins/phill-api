import AWS from "aws-sdk"

import { logger } from "../../helpers/logger"
import { env } from "@shared/env"

export interface IUploadProps {
  body: string
  key: string
}

class S3Provider {
  private s3: AWS.S3

  constructor() {
    this.s3 = new AWS.S3({
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_SECRET_KEY,
      },
      region: env.S3_REGION,
    })
  }

  async checkFile(key: string) {
    logger.debug("checkFile")
    return new Promise((resolve) => {
      this.s3
        .getObject({
          Bucket: env.S3_BUCKET,
          Key: key,
        })
        .promise()
        .then(() => resolve(true))
        .catch((error) => {
          logger.error(error)

          resolve(false)
        })
    })
  }

  async deleteFile(key: { key: string }) {
    const params = {
      Bucket: env.S3_BUCKET,
      Key: key.key,
    }
    return new Promise((resolve, reject) => {
      this.s3
        .deleteObject(params)
        .promise()
        .then((data) => {
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async uploadFile(params: IUploadProps) {
    logger.debug("uploadFile")
    return new Promise((resolve, reject) => {
      this.s3
        .upload({
          Bucket: env.S3_BUCKET,
          Body: params.body,
          Key: params.key,
        })
        .promise()
        .then((data) => {
          resolve(data.Location)
        })
        .catch((error) => {
          logger.error(error)

          reject(error)
        })
    })
  }
}

export { S3Provider }
