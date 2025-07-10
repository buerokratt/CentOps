## About

This README provides an overview of the CentOps Helm chart, instructions for packaging the chart, details on the automated Vault secrets creation and steps to run helm install for deployment in the namespace (chosen by deployment engineer) on a Kubernetes cluster.


#### Quick Overview of the Charts

- The CentOps Helm chart deploys microservices (dmapper, resql, resql-users, ruuter, tim, database) and a Vault instance.

- DSL's needed for microservices, will be delivered to containers, using a initContainer instance an git clone command

- HashiCorp Vault with an unseal job (job-vault-unseal.yaml) for automatic unsealing.


#### Vault init automation

Implemented: Vault secrets (vault-unseal-secret, vault-token-secret) are created by a Helm init job (job-vault-init.yaml) that runs vault operator init to generate an unseal key and root token.
**Files**:
- templates/job-vault-init.yaml: Pre-install/upgrade hook, initializes Vault, creates secrets.
- templates/vault-init-rbac.yaml: RBAC for kubectl to create/update secrets.

**Execution**:
- job-vault-init waits for Vault (http://vault:8200/v1/sys/health).
- Runs vault operator init -key-shares=1 -key-threshold=1, extracts unseal key and root token with jq.
- Creates vault-unseal-secret and vault-token-secret via kubectl apply.
- Deletes itself (hook-delete-policy: hook-succeeded).

**Requirements**:
- Vault service named vault.
- jq in the Vault image.
- ServiceAccount with secret creation permissions.



#### How to package

`cd Centops`  
`helm package .`  

Output generates `CentOps-0.2.0.tgz` (version from `Chart.yaml`).  
Verify `ls -l *.tgz`


#### How to run

**Local Dry run**

In `CentOps/helm/CentOps` run

`helm template centops-release ./CentOps --namespace centops > output.yaml`

**Validate**:

`kubectl apply --dry-run=client -f output.yaml`

**Optional: Validate manually with yq**

`yq e 'select(.kind == null or .apiVersion == null)' output.yaml`

**Install**: 

`helm install <RELEASE-NAME> ./CentOps --namespace <NAMESPACE> --create-namespace-value`

**Verify**

**Verify secrets creation** 

`kubectl get secret -n <NAMESPACE> vault-unseal-secrets vault-token-secrets`  

`kubectl get job --n <NAMESPACE> vault-unseal-secrets`  

**Verify if Vault is unsealed**  

`VAULT_POD=$(kubectl get pod --n <NAMESPACE> -l app=vault-unsealing -o jsonpath='{.items[0].metadata.name}')`  

`kubectl exec -it $VAULT_POD -n <NAMESPACE> -- vault status`  

**Verify that DSL's are present (using Dmapper as example)** 

`DMAPPER_POD=$(kubectl get pod --n <NAMESPACE> -l app=d--mapper -o jsonpath='{.items[0].metadata.name}')`  

`kubectl exec -it $DMAPPER_POD -n <NAMESPACE> --c dmapper -- ls /workspace/app/modules  `