from typing import List, Dict, Any
from datetime import datetime

class CarbonEstimationModel:
    """Estimates carbon footprint based on resource usage and regional data."""
    
    # PUE (Power Usage Effectiveness) defaults
    CLOUD_PUE = {
        "aws": 1.15,
        "azure": 1.12,
        "gcp": 1.10
    }

    def estimate_footprint(self, usage_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        total_carbon_g = 0
        breakdown = {}
        
        for entry in usage_data:
            cloud = entry.get("provider", "aws")
            pue = self.CLOUD_PUE.get(cloud, 1.2)
            
            # Simplified: usage_kwh * carbon_intensity * PUE
            kwh = entry.get("kwh_consumed", 0)
            intensity = entry.get("regional_intensity", 400)
            
            carbon = kwh * intensity * pue
            total_carbon_g += carbon
            
            breakdown[entry["resource_id"]] = {
                "carbon_g": round(carbon, 2),
                "efficiency_factor": pue
            }
            
        return {
            "total_carbon_g": round(total_carbon_g, 2),
            "breakdown": breakdown,
            "timestamp": datetime.utcnow().isoformat()
        }
