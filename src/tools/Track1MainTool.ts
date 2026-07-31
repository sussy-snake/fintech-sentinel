import { ControllerDecorator as Controller, ToolDecorator as Tool, Widget, ExecutionContext } from '@nitrostack/core';
import { z } from 'zod';

// 1. Update the Input Schema to ask for a Case ID
const InvestigationSchema = z.object({
  caseId: z.string().describe('Fraud Case ID (e.g., FRAUD-1023)')
});

@Controller('track1')
export class Track1Service {
  
  // 2. The missing mock database from the screenshots!
  private fraudCases = {
    'FRAUD-1023': {
      customer: 'Rahul Sharma',
      amount: 75000,
      merchant: 'ABC Electronics',
      location: 'Mumbai',
      device: 'DEV-NEW-889'
    },
    'FRAUD-1024': {
      customer: 'Priya Patel',
      amount: 12000,
      merchant: 'Starbucks',
      location: 'Delhi',
      device: 'DEV-OLD-112'
    }
  };

  @Tool({
    name: 'investigate_fraud',
    description: 'Investigates a fraud case and returns a detailed risk dashboard.',
    inputSchema: InvestigationSchema
  })
  @Widget('track1-widget') // Sending data to our existing widget
  async investigateFraud(input: z.infer<typeof InvestigationSchema>, ctx: ExecutionContext) {
    ctx.logger.info(`Investigating case: ${input.caseId}`);

    // Lookup the case in our dictionary
    const fraudCase = this.fraudCases[input.caseId as keyof typeof this.fraudCases];

    if (!fraudCase) {
      throw new Error(`Case ${input.caseId} not found in database.`);
    }

    // 3. The Logic: High Risk if amount is over 50,000
    const isHighRisk = fraudCase.amount > 50000;
    const riskScore = isHighRisk ? 92 : 35;
    const verdict = isHighRisk ? 'HIGH RISK' : 'LOW RISK';

    // 4. Return the compiled dossier
    return {
      customer: fraudCase.customer,
      amount: fraudCase.amount,
      merchant: fraudCase.merchant,
      location: fraudCase.location,
      device: fraudCase.device,
      verdict: verdict,
      riskScore: riskScore
    };
  }
}