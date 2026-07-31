import { Tool, Widget, ExecutionContext, z } from '@nitrostack/core';

// 1. Define the input expected from NitroStudio / AI model
const AnalysisInputSchema = z.object({
  targetName: z.string().describe('Account ID, entity, or transaction reference to analyze'),
  amount: z.number().optional().describe('Optional transaction amount')
});

export class Track1Service {
  @Tool({
    name: 'run_track1_analysis',
    description: 'Executes core financial risk and intelligence checks for Track 01.',
    schema: AnalysisInputSchema
  })
  @Widget('track1-widget') // Matches the folder name: src/widgets/app/track1-widget/page.tsx
  async executeAnalysis(input: z.infer<typeof AnalysisInputSchema>, ctx: ExecutionContext) {
    ctx.logger.info(`Running analysis for: ${input.targetName}`);

    // Mock analysis calculation logic
    const calculatedScore = Math.floor(Math.random() * 40) + 60; // Generates score between 60-100

    // Return object gets passed directly to `data` inside src/widgets/app/track1-widget/page.tsx
    return {
      targetName: input.targetName,
      amount: input.amount ?? 0,
      timestamp: new Date().toLocaleTimeString(),
      healthScore: calculatedScore,
      status: calculatedScore > 75 ? 'HIGH_RISK' : 'OPTIMAL',
      metrics: {
        latency: '42ms',
        complianceCheck: 'PASSED',
        confidenceScore: '98.4%'
      }
    };
  }
}