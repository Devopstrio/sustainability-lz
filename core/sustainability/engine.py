import uuid
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta

class SustainabilityOptimizationEngine:
    """Orchestrates resource optimization based on sustainability and cost metrics."""
    
    def analyze_resource_utilization(self, resources: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        recommendations = []
        for res in resources:
            cpu_util = res.get("cpu_utilization", 100)
            if cpu_util < 10:
                recommendations.append({
                    "resource_id": res["id"],
                    "type": "RIGHTSIZING",
                    "reason": f"Low CPU utilization ({cpu_util}%) detected over 7 days.",
                    "estimated_carbon_reduction_g": 450,
                    "estimated_cost_saving_usd": 12.50,
                    "priority": "HIGH"
                })
            elif res.get("is_idle", False):
                recommendations.append({
                    "resource_id": res["id"],
                    "type": "TERMINATION",
                    "reason": "Resource has been idle with no active connections for 48h.",
                    "estimated_carbon_reduction_g": 1200,
                    "estimated_cost_saving_usd": 45.00,
                    "priority": "CRITICAL"
                })
        return recommendations

class CarbonAwareScheduler:
    """Schedules batch workloads based on regional carbon intensity forecasts."""
    
    # Simulated regional carbon intensity (gCO2/kWh) by hour
    REGION_FORECASTS = {
        "us-east-1": [450, 420, 380, 350, 400, 480, 520, 500],
        "west-europe": [210, 200, 180, 150, 160, 190, 220, 230],
        "asia-northeast-1": [580, 550, 500, 480, 520, 600, 650, 620]
    }

    def get_optimal_window(self, job_duration_hours: int, region: str) -> Dict[str, Any]:
        forecast = self.REGION_FORECASTS.get(region, [400] * 8)
        min_intensity = min(forecast)
        best_hour = forecast.index(min_intensity)
        
        return {
            "region": region,
            "optimal_start_hour_offset": best_hour,
            "intensity_at_start": min_intensity,
            "carbon_saving_pct": round(((max(forecast) - min_intensity) / max(forecast)) * 100, 2)
        }

class PolicyComplianceEngine:
    """Enforces sustainability landing zone policies."""
    
    def validate_deployment(self, deployment: Dict[str, Any]) -> Dict[str, Any]:
        violations = []
        region = deployment.get("region")
        
        # Policy: Batch jobs must be in 'west-europe' or other low-carbon regions
        if deployment.get("type") == "BATCH" and region not in ["west-europe", "us-west-2"]:
            violations.append({
                "policy": "BATCH_REGION_RESTRICTION",
                "severity": "MEDIUM",
                "message": f"Batch workloads should prefer low-carbon regions. Current: {region}"
            })
            
        # Policy: Mandatory tagging for sustainability reporting
        if "sustainability_impact" not in deployment.get("tags", {}):
            violations.append({
                "policy": "TAGGING_COMPLIANCE",
                "severity": "HIGH",
                "message": "Missing 'sustainability_impact' tag for resource lifecycle tracking."
            })
            
        return {
            "is_compliant": len(violations) == 0,
            "violations": violations
        }

if __name__ == "__main__":
    # Test Simulation
    opt = SustainabilityOptimizationEngine()
    scheduler = CarbonAwareScheduler()
    policy = PolicyComplianceEngine()
    
    print("--- Sustainability Landing Zone Simulation ---")
    
    # 1. Analyze Resources
    res_list = [
        {"id": "vm-prod-01", "cpu_utilization": 5, "is_idle": False},
        {"id": "db-staging-02", "cpu_utilization": 80, "is_idle": True}
    ]
    recs = opt.analyze_resource_utilization(res_list)
    print(f"[OPTIMIZER] Found {len(recs)} optimization opportunities.")
    
    # 2. Schedule Job
    window = scheduler.get_optimal_window(2, "west-europe")
    print(f"[SCHEDULER] Optimal window for 'west-europe' starts in {window['optimal_start_hour_offset']}h (Intensity: {window['intensity_at_start']} g/kWh).")
    
    # 3. Policy Check
    deploy = {"type": "BATCH", "region": "us-east-1", "tags": {"env": "prod"}}
    result = policy.validate_deployment(deploy)
    print(f"[POLICY] Deployment Compliant: {result['is_compliant']}")
    for v in result['violations']:
        print(f"  Violation: {v['policy']} | {v['message']}")
