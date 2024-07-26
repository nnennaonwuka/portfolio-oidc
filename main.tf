# Specify the provider
provider "google" {
  project = "agri-os-prod"
  region  = "europe-west3"
}

# Create a Workload Identity Pool
resource "google_iam_workload_identity_pool" "oidc_pool" {
  workload_identity_pool_id = "oidc-pool"
  display_name              = "OIDC Pool"
  project                   = "agri-os-prod"
  location                  = "global"
}

# Create an OIDC Provider within the Workload Identity Pool
resource "google_iam_workload_identity_pool_provider" "oidc_provider" {
  workload_identity_pool_id = google_iam_workload_identity_pool.oidc_pool.workload_identity_pool_id
  workload_identity_pool    = google_iam_workload_identity_pool.oidc_pool.id
  provider_id               = "oidc-provider"
  display_name              = "OIDC Provider"
  issuer_uri                = "https://token.actions.githubusercontent.com"
  attribute_mapping = {
    "google.subject" = "assertion.sub"
    "attribute.actor" = "assertion.actor"
    "attribute.aud" = "assertion.aud"
  }
}

# Create IAM Policy Binding for the Service Account
resource "google_iam_policy_binding" "oidc_binding" {
  role    = "roles/iam.workloadIdentityUser"
  members = [
    "principalSet://iam.googleapis.com/projects/524687905739/locations/global/workloadIdentityPools/oidc-pool/attribute.repository/https://github.com/nnennaonwuka/portfolio-oidc"
  ]

  resource = "projects/agri-os-prod/serviceAccounts/oidc-test@agri-os-prod.iam.gserviceaccount.com"
}
