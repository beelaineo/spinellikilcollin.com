workflow "Test & Deploy" {
  on = "push"
  resolves = [
#     "deploy:production",
    "deploy:staging",
  ]
}

# action "Master" {
#   uses = "actions/bin/filter@master"
#   args = "branch master"
# }

action "Develop" {
  uses = "actions/bin/filter@master"
  args = "branch develop"
}

action "Test: Staging" {
  needs = "Develop"
  uses = "actions/npm@master"
  args = "test"
}

# action "Test: Production" {
#   needs = "Master"
#   uses = "actions/npm@master"
#   args = "test"
# }

action "deploy:staging" {
  uses = "actions/zeit-now@master"
  needs = "Test: Staging"
  secrets = [
    "ZEIT_TOKEN",
  ]
  args = "--local-config ./app/now.json --target staging"
}

# action "deploy:production" {
#   uses = "actions/zeit-now@master"
#   needs = "Test: Production"
#   secrets = [
#     "ZEIT_TOKEN",
#   ]
#   args = "--local-config ./app/now.json --target production"
# }
