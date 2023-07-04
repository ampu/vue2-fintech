import axios, {AxiosInstance} from 'axios'

import {Occupation} from './occupation-utils.ts'

const BASE_URL = `https://pp.credit/Services/BrokerService/api`
const REQUEST_TIMEOUT = 5000

export type ApiOccupation = {
  code: string,
  value: string,
}

type GetOccupationsResponse = {
  isSuccess: boolean
  error: string | null
  description: ApiOccupation[]
}

const importOccupationsFromGetOccupationsResponse = (response: { data: GetOccupationsResponse }) => {
  return response.data.description.map(({code, value}) => {
    return {
      value: code,
      text: `${code} - ${value}`,
    }
  })
}

class ApiProvider {
  _client: AxiosInstance

  constructor() {
    this._client = axios.create({
      timeout: REQUEST_TIMEOUT,
      baseURL: BASE_URL,
    })
  }

  async getOccupations(): Promise<Occupation[]> {
    return this._client
      .post(`/Application/Dictionary`, {
        dictName: `ARM_OccupationArea`,
      })
      .then(importOccupationsFromGetOccupationsResponse)
  }
}

export const apiProvider = new ApiProvider()
