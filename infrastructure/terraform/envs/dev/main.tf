module "landing_zone_vpc" {
  source = "./modules/networking"

  vpc_name = "sustainability-lz-vpc"
  enable_flow_logs = true
}

module "optimization_db" {
  source = "./modules/database"

  db_name = "sustainability_optimization_metadata"
}

module "impact_monitoring" {
  source = "./modules/monitoring"

  retention_days = 365
}

resource "kubernetes_namespace" "sustainability_ops" {
  metadata {
    name = "sustainability-lz"
    labels = {
      "sustainability.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "sustainability_policies" {
  metadata {
    name      = "sustainability-global-policies"
    namespace = kubernetes_namespace.sustainability_ops.metadata[0].name
  }

  data = {
    "optimization-threshold" = "15"
    "low-carbon-regions"     = "west-europe,us-west-2,canada-central"
    "tagging-mandatory"      = "true"
    "scheduling-enabled"     = "true"
  }
}
