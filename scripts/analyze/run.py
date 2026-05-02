import sys
import time
from core.sustainability.engine import SustainabilityOptimizationEngine, CarbonAwareScheduler, PolicyComplianceEngine

def run_sustainability_simulation():
    # 1. Initialize Engines
    opt = SustainabilityOptimizationEngine()
    scheduler = CarbonAwareScheduler()
    policy = PolicyComplianceEngine()
    
    print("--- Sustainability Landing Zone Platform Simulation ---")
    
    # 2. Simulate Resource Analysis
    print(f"\n[ANALYSIS] Scanning multi-cloud landing zone for sustainability leaks...")
    res_list = [
        {"id": "prod-web-server-01", "cpu_utilization": 4, "is_idle": False},
        {"id": "staging-db-replica", "cpu_utilization": 85, "is_idle": True},
        {"id": "analytics-node-03", "cpu_utilization": 92, "is_idle": False}
    ]
    recs = opt.analyze_resource_utilization(res_list)
    for r in recs:
        print(f"  >>> RECO: {r['type']} on {r['resource_id']} | Potential Saving: {r['estimated_carbon_reduction_g']}g CO2e")
    
    # 3. Simulate Carbon-Aware Scheduling
    print(f"\n[SCHEDULER] Optimizing batch workload placement for 'west-europe'...")
    window = scheduler.get_optimal_window(4, "west-europe")
    print(f"  Best window starts in {window['optimal_start_hour_offset']} hours.")
    print(f"  Projected Carbon Reduction: {window['carbon_saving_pct']}%")
    
    # 4. Enforce Governance Policies
    print(f"\n[GOVERNANCE] Validating landing zone deployment compliance...")
    deployments = [
        {"type": "BATCH", "region": "us-east-1", "tags": {"env": "prod"}}, # Violation
        {"type": "WEB", "region": "west-europe", "tags": {"env": "prod", "sustainability_impact": "high"}} # Compliant
    ]
    
    for idx, d in enumerate(deployments):
        res = policy.validate_deployment(d)
        status = "COMPLIANT" if res['is_compliant'] else "NON-COMPLIANT"
        print(f"  Deployment {idx+1}: {status}")
        for v in res['violations']:
            print(f"    - Violation: {v['policy']} | {v['message']}")

if __name__ == "__main__":
    run_sustainability_simulation()
