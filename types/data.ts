interface Measure {
  "Action Outline": {
    "Action name": string;
    "Action type": string;
    "Action description": string;
  },
  "Reference to impact pathway": {
    "Field of action": string;
    "Systmeic lever": string;
    "Governance and policy": string;
  },
  "Implemetation": {
    "Responsible bodies/person for implementation": string;
    "Action scale & addressed entities": string;
    "Involved stakeholders": string;
    "Comments on implementation": string;
    "Next steps": string[];
  },
  "Impact & cost": {
    "Generated renewable energy": string;
    "Removed/substituted energy": string;
    "GHG emissions reduction estimate (total)": string;
    "Total costs and costs by CO2e unit": string;
  }
}