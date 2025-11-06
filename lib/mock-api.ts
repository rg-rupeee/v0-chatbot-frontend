/**
 * Mock API for chat responses
 * In production, this would call your actual backend API
 */

interface MockResponse {
  content: string
}

// Simulated database of entity configurations
const entityDatabase: Record<string, any> = {
  entity_12345: {
    name: "Order Entity",
    fields: ["orderId", "customerId", "amount", "status", "createdAt"],
    status: "active",
    version: "2.1.0",
  },
  product_001: {
    name: "Product Entity",
    fields: ["productId", "name", "price", "inventory", "category"],
    status: "active",
    version: "1.5.3",
  },
}

const mockResponses = [
  "The entity configuration appears to be valid. All required fields are present and properly typed. Consider adding an index on the customerId field for improved query performance.",
  "I found a potential issue: The status field is using string type but should consider using an enum. This will reduce data validation errors and improve data consistency.",
  "Configuration check passed. The entity follows all naming conventions and structure guidelines. The field ordering is optimal for database performance.",
  "Warning: The amount field should have a decimal type with 2 decimal places for financial accuracy. Current type may cause precision issues.",
  "The entity structure is compliant with your business rules. All validations have been satisfied. No immediate action required.",
]

export async function mockChatAPI(userMessage: string, isFirstPrompt: boolean, entityId: string): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (isFirstPrompt) {
    // First prompt - provide entity overview
    const entity = entityDatabase[entityId] || {
      name: "Custom Entity",
      fields: ["field1", "field2", "field3"],
      status: "active",
      version: "1.0.0",
    }

    return `I've loaded the configuration for entity "${entityId}". Here's what I found:

**Entity Details:**
- Name: ${entity.name}
- Status: ${entity.status}
- Version: ${entity.version}
- Fields: ${entity.fields.join(", ")}

This entity is ready for validation. What specific aspects would you like me to validate? I can check:
1. Field type compatibility
2. Rule consistency
3. Performance implications
4. Compliance requirements`
  }

  // Subsequent prompts - provide contextual validation responses
  // Select a random mock response for demonstration
  const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]

  return randomResponse
}
