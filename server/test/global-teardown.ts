export default async function globalTeardown() {
  await global.__ENVIRONMENT__?.down();
}
