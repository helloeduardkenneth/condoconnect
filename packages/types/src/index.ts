export interface User {
  id: string;
  email: string;
  role: 'RESIDENT' | 'ADMIN' | 'GUARD';
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tenant {
  id: string;
  name: string;
  address: string;
  createdAt: Date;
}
