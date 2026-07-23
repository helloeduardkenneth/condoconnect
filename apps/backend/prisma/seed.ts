import { PrismaClient, PropertyType, UserRole, UserStatus, MembershipStatus, OccupancyType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial CondoConnect database...');

  const tenant = await prisma.tenant.upsert({
    where: { slug: 'grand-residences' },
    update: {},
    create: {
      name: 'Grand Residences Management',
      slug: 'grand-residences',
      address: '100 Metro Avenue, City Center',
    },
  });

  const property = await prisma.property.upsert({
    where: { id: 'prop-grand-tower-1' },
    update: {},
    create: {
      id: 'prop-grand-tower-1',
      tenantId: tenant.id,
      name: 'Grand Heights Tower A',
      address: '100 Metro Avenue, Building A',
      propertyType: PropertyType.CONDO,
    },
  });

  const building = await prisma.building.upsert({
    where: { id: 'bld-tower-a' },
    update: {},
    create: {
      id: 'bld-tower-a',
      propertyId: property.id,
      name: 'Tower A Main',
      totalFloors: 25,
    },
  });

  const unit = await prisma.unit.upsert({
    where: { buildingId_unitNumber: { buildingId: building.id, unitNumber: '1001' } },
    update: {},
    create: {
      buildingId: building.id,
      unitNumber: '1001',
      floorNumber: 10,
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@condoconnect.com' },
    update: {},
    create: {
      email: 'admin@condoconnect.com',
      phoneNumber: '+1234567890',
      fullName: 'System Administrator',
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.userProperty.upsert({
    where: { userId_propertyId: { userId: adminUser.id, propertyId: property.id } },
    update: {},
    create: {
      userId: adminUser.id,
      propertyId: property.id,
      role: UserRole.ADMIN,
      status: MembershipStatus.ACTIVE,
      isPrimaryProperty: true,
    },
  });

  console.log('Seeding complete! Created Tenant, Property, Building, Unit, and Admin User.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
