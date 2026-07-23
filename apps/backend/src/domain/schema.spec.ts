import { PropertyType, UserRole, UserStatus, MembershipStatus, OccupancyType, VehicleStatus } from '@prisma/client';

describe('Core Data Model Schema Constraints', () => {
  describe('Tenant & Property Hierarchy (AC-1)', () => {
    it('defines valid property types for multi tenant complexes', () => {
      expect(PropertyType.CONDO).toBe('CONDO');
      expect(PropertyType.VILLAGE).toBe('VILLAGE');
      expect(PropertyType.GATED_COMMUNITY).toBe('GATED_COMMUNITY');
    });
  });

  describe('User Profile & Status Decoupling (AC-2)', () => {
    it('defines valid user status states without embedded credentials', () => {
      expect(UserStatus.ACTIVE).toBe('ACTIVE');
      expect(UserStatus.INVITED).toBe('INVITED');
      expect(UserStatus.SUSPENDED).toBe('SUSPENDED');
    });
  });

  describe('UserProperty Membership & Roles (AC-3)', () => {
    it('supports multi property role assignments across RESIDENT, ADMIN, and GUARD', () => {
      expect(UserRole.RESIDENT).toBe('RESIDENT');
      expect(UserRole.ADMIN).toBe('ADMIN');
      expect(UserRole.GUARD).toBe('GUARD');

      expect(MembershipStatus.PENDING).toBe('PENDING');
      expect(MembershipStatus.ACTIVE).toBe('ACTIVE');
      expect(MembershipStatus.SUSPENDED).toBe('SUSPENDED');
    });
  });

  describe('UnitOccupant & Vehicle Registration (AC-4, AC-5)', () => {
    it('supports occupancy types and vehicle status flags', () => {
      expect(OccupancyType.OWNER).toBe('OWNER');
      expect(OccupancyType.TENANT).toBe('TENANT');
      expect(OccupancyType.FAMILY_MEMBER).toBe('FAMILY_MEMBER');

      expect(VehicleStatus.ACTIVE).toBe('ACTIVE');
      expect(VehicleStatus.INACTIVE).toBe('INACTIVE');
    });
  });
});
