export interface IMailProps {
  to: string
  subject: string
  template: string
}

export interface IMailProvider {
  sendMail(data: IMailProps): Promise<void>
}
