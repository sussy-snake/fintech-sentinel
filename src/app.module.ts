import { McpApp, Module } from '@nitrostack/core';
import { SystemHealthCheck } from './health/system.health.js';
import { Track1Service } from './tools/Track1MainTool.js';

@McpApp({
  module: AppModule,
  server: {
    name: 'fintech-sentinel-server',
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
    
  ],
  providers: [
    SystemHealthCheck,
  ],
  controllers: [
    Track1Service,
  ]
})
export class AppModule {}