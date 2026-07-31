import { McpApp, Module, ConfigModule } from '@nitrostack/core';
import { CalculatorModule } from './modules/calculator/calculator.module.js';
import { SystemHealthCheck } from './health/system.health.js';
import { Track1Service } from './tools/Track1MainTool.js';

@McpApp({
  module: AppModule,
  server: {
    name: 'calculator-server',
    version: '1.0.0',
  },
  logging: {
    level: 'info',
  },
})
@Module({
  name: 'app',
  description: 'Root application module',
  imports: [
    ConfigModule.forRoot(),
    CalculatorModule,
  ],
  providers: [
    SystemHealthCheck,
    Track1Service,
  ],
})
export class AppModule {}