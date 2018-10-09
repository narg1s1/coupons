import { RestUrlInterface } from '../interfaces';

export const apiUrls: RestUrlInterface = {

  getVouchersUrl: (pageNumber: number): string => `/api/v1/vouchers?page=${pageNumber}`,
  createVoucherUrl: (): string => '/api/v1/vouchers',
  getVoucherUrl: (couponUuid: string): string => `/api/v1/vouchers/${couponUuid}`,
  updateVoucherUrl: (couponUuid: string): string => `/api/v1/vouchers/${couponUuid}`,
  deleteVouchersUrl: (): string => `/api/v1/vouchers`,

};
