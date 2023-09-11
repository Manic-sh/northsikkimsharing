

export function getPackageTypeId(packageName, packageDetail) {
  const availablePackageType = packageDetail?.data?.availablePackageType;
  const matchingPackage = availablePackageType?.find((packageType) => {
    return packageType?.typeName?.typeName?.value?.data?.name === packageName;
  });

  if (matchingPackage) {
    return matchingPackage.typeName?.typeName?.value?.id;
  } else {
    return null; // Return null if the package name is not found
  }
}
