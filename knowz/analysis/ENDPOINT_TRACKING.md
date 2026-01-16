# API Endpoint Tracking

> Auto-generated from Swagger: https://api.dev.knowz.io/swagger/v1/swagger.json
> Generated: 2026-01-16T00:12:35.932Z

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total Endpoints | 674 |
| Deprecated | 0 |
| Likely Used | 111 |
| Likely Unused | 87 |
| Unknown | 476 |

## Recommendations

| Action | Count |
|--------|-------|
| Keep | 111 |
| Review | 563 |
| Drop | 0 |

## Usage Legend

- **likely-used**: Core functionality (Knowledge, Auth, Chat, etc.)
- **likely-unused**: Admin/Test/Debug endpoints
- **deprecated**: Marked deprecated in Swagger
- **unknown**: Needs manual review

## How to Update

Edit the `notes` field in `endpoint_tracking.json` to add your assessment:
- Set `usage` to: `used`, `unused`, or `deprecated`
- Set `recommendation` to: `keep`, `drop`, or `review`
- Add context in `notes`

---

## Endpoints by Category

### AI (2 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/ai/generate-update-preview` | ❓ | REV |  |
| POST | `/api/v1/ai/interpret-update` | ❓ | REV |  |

### Admin Diagnostics (2 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/admin/diagnostics` | ⚠️ | REV | Get diagnostic logs across all tenants ( |
| GET | `/api/v1/admin/diagnostics/stats` | ⚠️ | REV | Get aggregated statistics across all ten |

### AdminTenantResources (6 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/admin/tenants/{tenantId}/resources` | ⚠️ | REV | Get current resource configuration for a |
| DELETE | `/api/v1/admin/tenants/{tenantId}/resources/{resourceType}` | ⚠️ | REV | Clear a specific resource configuration  |
| PUT | `/api/v1/admin/tenants/{tenantId}/resources/database` | ⚠️ | REV | Configure database resource for a tenant |
| GET | `/api/v1/admin/tenants/{tenantId}/resources/health` | ⚠️ | REV | Get health status of a tenant's BYOI res |
| PUT | `/api/v1/admin/tenants/{tenantId}/resources/search` | ⚠️ | REV | Configure search resource for a tenant ( |
| PUT | `/api/v1/admin/tenants/{tenantId}/resources/storage` | ⚠️ | REV | Configure storage resource for a tenant  |

### Ai (2 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/ai/generate-embedding` | ❓ | REV | Generate embeddings for text |
| POST | `/api/v1/ai/generate-summary` | ❓ | REV | Generate summary for content |

### AiConfiguration (7 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/ai/config` | ❓ | REV | Get the resolved AI configuration for th |
| DELETE | `/api/v1/ai/config/tenant` | ❓ | REV | Delete the tenant-level AI configuration |
| GET | `/api/v1/ai/config/tenant` | ❓ | REV | Get the tenant-level AI configuration (r |
| PUT | `/api/v1/ai/config/tenant` | ❓ | REV | Create or update the tenant-level AI con |
| DELETE | `/api/v1/ai/config/vault/{vaultId}` | ❓ | REV | Delete the vault-level AI configuration, |
| GET | `/api/v1/ai/config/vault/{vaultId}` | ❓ | REV | Get the vault-level AI configuration (ra |
| PUT | `/api/v1/ai/config/vault/{vaultId}` | ❓ | REV | Create or update the vault-level AI conf |

### AiPrompts (6 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/ai/prompts` | ❓ | REV | Get all AI prompts for the current tenan |
| DELETE | `/api/v1/ai/prompts/{promptKey}` | ❓ | REV | Reset a prompt to system default (delete |
| GET | `/api/v1/ai/prompts/{promptKey}` | ❓ | REV | Get a specific AI prompt by key |
| PUT | `/api/v1/ai/prompts/{promptKey}` | ❓ | REV | Update or create a tenant-specific AI pr |
| POST | `/api/v1/ai/prompts/{promptKey}/execute` | ❓ | REV | Execute a prompt with the AI model and r |
| POST | `/api/v1/ai/prompts/{promptKey}/test` | ❓ | REV | Test a prompt with sample variables (pre |

### AuditLog (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/audit` | ❓ | REV | Get paginated audit logs with filters |
| GET | `/api/v1/audit/{id}` | ❓ | REV | Get a single audit log by ID |
| GET | `/api/v1/audit/entity/{entityType}/{entityId}` | ❓ | REV | Get audit logs for a specific entity |

### Authentication (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/auth/register` | ✅ | KEEP | Register a new tenant or re-register an  |
| POST | `/api/v1/auth/validate-key` | ✅ | KEEP | Validate API key (simplified endpoint fo |
| POST | `/api/v1/auth/verify` | ✅ | KEEP | Verify tenant credentials |

### Background Jobs (11 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/jobs` | ❓ | REV | Get jobs for current tenant |
| GET | `/api/v1/jobs/{jobId}` | ❓ | REV | Get job details by ID |
| POST | `/api/v1/jobs/{jobId}/cancel` | ❓ | REV | Cancel a queued or running job |
| POST | `/api/v1/jobs/{jobId}/retry` | ❓ | REV | Retry a failed job |
| GET | `/api/v1/jobs/active` | ❓ | REV | Get active jobs for current tenant |
| POST | `/api/v1/jobs/ai` | ❓ | REV | Queue an AI processing job |
| POST | `/api/v1/jobs/cleanup` | ❓ | REV | Cleanup old completed jobs |
| POST | `/api/v1/jobs/document` | ❓ | REV | Queue a document processing job |
| GET | `/api/v1/jobs/my` | ❓ | REV | Get jobs for current user |
| GET | `/api/v1/jobs/statistics` | ❓ | REV | Get job statistics for current tenant |
| POST | `/api/v1/jobs/web` | ❓ | REV | Queue a web indexing job |

### Chat (1 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/chat` | ✅ | KEEP | Send a chat message (simplified interfac |

### Chat Configuration (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/chat-config` | ✅ | KEEP | Get complete chat configuration |
| POST | `/api/v1/chat-config/templates` | ✅ | KEEP | Create new chat template |
| DELETE | `/api/v1/chat-config/templates/{templateId}` | ✅ | KEEP | Delete chat template |
| PUT | `/api/v1/chat-config/templates/{templateId}` | ✅ | KEEP | Update chat template |
| POST | `/api/v1/chat-config/templates/{templateId}/clone` | ✅ | KEEP | Clone chat template |

### Chat Streaming (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/knowledge/chat/debug-document/{knowledgeId}` | ✅ | KEEP | Debug a specific document in Azure AI Se |
| GET | `/api/v1/knowledge/chat/debug-search` | ✅ | KEEP | Debug Azure AI Search index status |
| POST | `/api/v1/knowledge/chat/stream` | ✅ | KEEP | Stream chat responses using Server-Sent  |

### ChatProgress (1 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/chat/progress/stream/{conversationId}` | ✅ | KEEP | Stream progress updates for a conversati |

### Codebase Research (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/codebase/analyze` | ✅ | KEEP | Analyze codebase with iterative research |
| POST | `/api/v1/codebase/continue/{conversationId}` | ✅ | KEEP | Continue an ongoing codebase research co |
| GET | `/api/v1/codebase/insights/{vaultName}` | ✅ | KEEP | Get persisted insights for a vault |

### Comments (14 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/knowledge/{knowledgeItemId}/comments` | ❓ | REV | Get all comments for a knowledge item |
| POST | `/api/v1/knowledge/{knowledgeItemId}/comments` | ❓ | REV | Create a new comment |
| DELETE | `/api/v1/knowledge/{knowledgeItemId}/comments/{commentId}` | ❓ | REV | Delete a comment |
| GET | `/api/v1/knowledge/{knowledgeItemId}/comments/{commentId}` | ❓ | REV | Get a single comment by ID |
| PUT | `/api/v1/knowledge/{knowledgeItemId}/comments/{commentId}` | ❓ | REV | Update a comment |
| POST | `/api/v1/knowledge/{knowledgeItemId}/comments/{commentId}/attachments` | ❓ | REV | Add attachment to a comment |
| DELETE | `/api/v1/knowledge/{knowledgeItemId}/comments/{commentId}/attachments/{attachmentId}` | ❓ | REV | Remove attachment from a comment |
| DELETE | `/api/v1/knowledge/{knowledgeItemId}/comments/{commentId}/badge` | ❓ | REV | Remove badge from an answer (comment) |
| PUT | `/api/v1/knowledge/{knowledgeItemId}/comments/{commentId}/badge` | ❓ | REV |  |
| POST | `/api/v1/knowledge/{knowledgeItemId}/comments/{commentId}/downvote` | ❓ | REV | Downvote a comment |
| GET | `/api/v1/knowledge/{knowledgeItemId}/comments/{commentId}/replies` | ❓ | REV | Get replies to a comment |
| POST | `/api/v1/knowledge/{knowledgeItemId}/comments/{commentId}/upvote` | ❓ | REV | Upvote a comment |
| GET | `/api/v1/knowledge/{knowledgeItemId}/comments/answers` | ❓ | REV | Get answers for a question with badge fi |
| GET | `/api/v1/knowledge/{knowledgeItemId}/comments/stats` | ❓ | REV | Get comment statistics for a knowledge i |

### CommentsModeration (2 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/comments/{commentId}/moderate` | ❓ | REV | Moderate a comment (approve, hide, rejec |
| GET | `/api/v1/comments/moderation` | ❓ | REV | Get moderation queue |

### Conversations (15 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/conversations` | ❓ | REV | Get list of my conversations |
| POST | `/api/v1/conversations` | ❓ | REV | Create a new conversation |
| POST | `/api/v1/conversations/{conversationId}/clear` | ❓ | REV | Clear conversation history |
| POST | `/api/v1/conversations/{conversationId}/messages` | ❓ | REV | Send a message in a conversation |
| DELETE | `/api/v1/conversations/{conversationId}/set-persona` | ❓ | REV | Clear the persona from a conversation (r |
| POST | `/api/v1/conversations/{conversationId}/set-persona` | ❓ | REV | Set or change the active persona for a c |
| GET | `/api/v1/conversations/{id}` | ❓ | REV | Get conversation details by ID |
| POST | `/api/v1/conversations/{id}/archive` | ❓ | REV | Archive a conversation |
| GET | `/api/v1/conversations/{id}/messages` | ❓ | REV | Get messages in a conversation |
| POST | `/api/v1/conversations/{id}/messages` | ❓ | REV | Send a message in a conversation |
| POST | `/api/v1/conversations/{id}/participants` | ❓ | REV | Add a participant to conversation |
| DELETE | `/api/v1/conversations/{id}/participants/{participantId}` | ❓ | REV | Remove a participant from conversation |
| POST | `/api/v1/conversations/{id}/read` | ❓ | REV | Mark conversation as read |
| GET | `/api/v1/conversations/active` | ❓ | REV | Get all active conversations |
| POST | `/api/v1/conversations/start` | ❓ | REV | Start a new conversation or continue exi |

### Customer Sites (8 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/sites` | ❓ | REV | List customer sites |
| POST | `/api/v1/sites` | ❓ | REV | Create a new customer site |
| DELETE | `/api/v1/sites/{id}` | ❓ | REV | Delete a customer site |
| GET | `/api/v1/sites/{id}` | ❓ | REV | Get customer site by ID |
| PUT | `/api/v1/sites/{id}` | ❓ | REV | Update a customer site |
| POST | `/api/v1/sites/{id}/publish` | ❓ | REV | Publish a customer site |
| POST | `/api/v1/sites/{id}/unpublish` | ❓ | REV | Unpublish a customer site |
| GET | `/api/v1/sites/check-slug/{slug}` | ❓ | REV | Check slug availability |

### Data Management (6 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/data-management/export` | ❓ | REV | Start data export job |
| GET | `/api/v1/data-management/export/{jobId}` | ❓ | REV | Get export job status |
| POST | `/api/v1/data-management/import` | ❓ | REV | Start data import job |
| GET | `/api/v1/data-management/import/{jobId}` | ❓ | REV | Get import job status |
| POST | `/api/v1/data-management/import/validate` | ❓ | REV | Validate import data (dry-run) |
| POST | `/api/v1/data-management/takeout` | ❓ | REV | Download complete data takeout as ZIP |

### Diagnostics (4 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| DELETE | `/api/v1/diagnostics` | ⚠️ | REV | Delete diagnostic logs older than specif |
| GET | `/api/v1/diagnostics` | ⚠️ | REV | Get diagnostic logs for the authenticate |
| POST | `/api/v1/diagnostics/export` | ⚠️ | REV | Export diagnostic logs to CSV or JSON |
| GET | `/api/v1/diagnostics/stats` | ⚠️ | REV | Get diagnostic statistics for the authen |

### Documentation (2 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/docs` | ❓ | REV | List available documentation |
| GET | `/api/v1/docs/client-integration` | ❓ | REV | Get client integration guide |

### EmailIngestion (4 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/email-ingestion/history` | ✅ | KEEP | Get paginated list of inbound emails for |
| GET | `/api/v1/email-ingestion/history/{id}` | ✅ | KEEP | Get single inbound email details by ID. |
| GET | `/api/v1/email-ingestion/settings` | ✅ | KEEP | Get tenant's email ingestion settings. |
| PUT | `/api/v1/email-ingestion/settings` | ✅ | KEEP | Update tenant's email ingestion settings |

### Enhanced Chat (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/chat/analyze-code` | ✅ | KEEP | Analyze code with specialized plugins |
| POST | `/api/v1/chat/confirm-edit` | ✅ | KEEP | Confirm and apply a pending edit proposa |
| POST | `/api/v1/chat/multi-step` | ✅ | KEEP | Execute multi-step reasoning workflow |
| POST | `/api/v1/chat/propose-edit` | ✅ | KEEP | Propose an AI-generated edit to knowledg |
| POST | `/api/v1/chat/reason` | ✅ | KEEP | Perform deep reasoning with iterative re |

### EnrichmentProgress (1 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/enrichment/progress/stream/{knowledgeId}` | ❓ | REV | Stream enrichment progress updates for a |

### Entities (22 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/entities/deduplication-status` | ✅ | KEEP | Get deduplication statistics for the aut |
| GET | `/api/v1/entities/duplicates/events` | ✅ | KEEP | Find duplicate events for the authentica |
| GET | `/api/v1/entities/duplicates/locations` | ✅ | KEEP | Find duplicate locations for the authent |
| GET | `/api/v1/entities/duplicates/persons` | ✅ | KEEP | Find duplicate persons for the authentic |
| GET | `/api/v1/entities/events` | ✅ | KEEP | Get all events for the authenticated ten |
| POST | `/api/v1/entities/events` | ✅ | KEEP | Create a new event with optional duplica |
| DELETE | `/api/v1/entities/events/{id}` | ✅ | KEEP | Delete an event (soft delete) |
| GET | `/api/v1/entities/events/{id}` | ✅ | KEEP | Get a specific event by ID |
| PUT | `/api/v1/entities/events/{id}` | ✅ | KEEP | Update an existing event |
| GET | `/api/v1/entities/locations` | ✅ | KEEP | Get all locations for the authenticated  |
| POST | `/api/v1/entities/locations` | ✅ | KEEP | Create a new location with optional dupl |
| DELETE | `/api/v1/entities/locations/{id}` | ✅ | KEEP | Delete a location (soft delete) |
| GET | `/api/v1/entities/locations/{id}` | ✅ | KEEP | Get a specific location by ID |
| PUT | `/api/v1/entities/locations/{id}` | ✅ | KEEP | Update an existing location |
| POST | `/api/v1/entities/merge/events` | ✅ | KEEP | Merge two events |
| POST | `/api/v1/entities/merge/locations` | ✅ | KEEP | Merge two locations |
| POST | `/api/v1/entities/merge/persons` | ✅ | KEEP | Merge two persons |
| GET | `/api/v1/entities/persons` | ✅ | KEEP | Get all persons for the authenticated te |
| POST | `/api/v1/entities/persons` | ✅ | KEEP | Create a new person with optional duplic |
| DELETE | `/api/v1/entities/persons/{id}` | ✅ | KEEP | Delete a person (soft delete) |
| GET | `/api/v1/entities/persons/{id}` | ✅ | KEEP | Get a specific person by ID |
| PUT | `/api/v1/entities/persons/{id}` | ✅ | KEEP | Update an existing person |

### EntityExtraction (1 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/entities/extract` | ❓ | REV | Extract entities from text using AI |

### ExploreEndpoints (6 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/explore/calendar` | ❓ | REV |  |
| POST | `/api/v1/explore/search` | ❓ | REV |  |
| GET | `/api/v1/explore/statistics` | ❓ | REV |  |
| GET | `/api/v1/explore/tags/graph` | ❓ | REV |  |
| GET | `/api/v1/explore/temporal/search` | ❓ | REV |  |
| GET | `/api/v1/explore/upcoming` | ❓ | REV |  |

### FeatureFlags (2 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/feature-flags` | ❓ | REV | Get effective feature flags for the curr |
| GET | `/api/v1/feature-flags/{flagPath}` | ❓ | REV | Check if a specific feature flag is enab |

### Federated Identity (4 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/auth/identity/login` | ❓ | REV | Login with email and password (federated |
| POST | `/api/v1/auth/identity/select-tenant/{tenantId}` | ❓ | REV | Select a tenant and get a JWT token |
| POST | `/api/v1/auth/identity/switch-tenant/{tenantId}` | ❓ | REV | Switch to a different tenant (requires v |
| GET | `/api/v1/auth/identity/tenants` | ❓ | REV | Get available tenants for the current id |

### Files (9 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/files` | ✅ | KEEP | List files in a vault |
| DELETE | `/api/v1/files/{fileId}` | ✅ | KEEP | Delete a file |
| GET | `/api/v1/files/{fileId}` | ✅ | KEEP | Get file metadata |
| GET | `/api/v1/files/{fileId}/download` | ✅ | KEEP | Download a file |
| GET | `/api/v1/files/{fileId}/url` | ✅ | KEEP | Generate a temporary download URL for a  |
| GET | `/api/v1/files/by-extension/{extension}` | ✅ | KEEP | List all files with a specific extension |
| GET | `/api/v1/files/query` | ✅ | KEEP | Query files with intelligent routing |
| GET | `/api/v1/files/stats` | ✅ | KEEP | Get file statistics by extension |
| POST | `/api/v1/vaults/{vaultName}/files` | ✅ | KEEP | Upload a file to a vault |

### GitHubOAuth (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/github/oauth/authorize` | ✅ | KEEP | Generate GitHub authorization URL for OA |
| GET | `/api/v1/github/oauth/callback` | ✅ | KEEP | Handle OAuth callback from GitHub. |
| GET | `/api/v1/github/oauth/installations` | ✅ | KEEP | List GitHub installations for current te |
| DELETE | `/api/v1/github/oauth/installations/{installationId}` | ✅ | KEEP | Revoke GitHub installation. |
| POST | `/api/v1/github/oauth/installations/{installationId}/validate` | ✅ | KEEP | Validate GitHub installation is still ac |

### GitHubRepositories (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/github/repositories` | ❓ | REV | List all GitHub repositories accessible  |
| GET | `/api/v1/github/repositories/{owner}/{repoName}` | ❓ | REV | Get details for specific GitHub reposito |
| GET | `/api/v1/github/repositories/{owner}/{repoName}/branches` | ❓ | REV | List all branches for a GitHub repositor |
| POST | `/api/v1/github/repositories/{owner}/{repoName}/connect` | ❓ | REV | Connect a GitHub repository to a vault u |
| GET | `/api/v1/github/repositories/{owner}/{repoName}/connection-status` | ❓ | REV | Check if repository is already connected |

### GitSync (13 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| DELETE | `/api/v1/git/{repositoryId}` | ❓ | REV | Disconnect and remove Git repository fro |
| GET | `/api/v1/git/{repositoryId}` | ❓ | REV | Get Git repository details and sync stat |
| GET | `/api/v1/git/{repositoryId}/sync-history` | ❓ | REV | Get paginated sync history for a Git rep |
| GET | `/api/v1/git/{repositoryId}/sync-status` | ❓ | REV | Get sync status summary with statistics  |
| POST | `/api/v1/git/{repositoryId}/test` | ❓ | REV | Test connection to Git repository |
| DELETE | `/api/v1/git/{repositoryId}/webhook` | ❓ | REV | Delete webhook configuration for Git rep |
| GET | `/api/v1/git/{repositoryId}/webhook` | ❓ | REV | Get webhook status for Git repository |
| DELETE | `/api/v1/git/{repositoryId}/webhook/auto-delete` | ❓ | REV | Delete webhook from GitHub repository vi |
| POST | `/api/v1/git/{repositoryId}/webhook/auto-register` | ❓ | REV | Auto-register webhook on GitHub reposito |
| POST | `/api/v1/git/{repositoryId}/webhook/configure` | ❓ | REV | Configure webhook for Git repository |
| POST | `/api/v1/git/configure` | ❓ | REV | Configure Git repository for a vault |
| GET | `/api/v1/git/repositories` | ❓ | REV | List all Git repositories for the curren |
| POST | `/api/v1/git/sync/{repositoryId}` | ❓ | REV | Manually trigger Git repository sync |

### GitWebhook (1 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/webhooks/github/{repositoryId}` | ❓ | REV | GitHub webhook endpoint for repository p |

### Graph (6 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/graph/{knowledgeId}/contradictions` | ❓ | REV | Get all contradictions for a knowledge i |
| GET | `/api/v1/graph/{knowledgeId}/deep-related` | ❓ | REV | Get related knowledge with depth (2-5 ho |
| POST | `/api/v1/graph/{knowledgeId}/normalize` | ❓ | REV | Manually trigger temporal normalization  |
| GET | `/api/v1/graph/{knowledgeId}/related` | ❓ | REV | Get directly related knowledge (1 hop). |
| GET | `/api/v1/graph/{knowledgeId}/timeline` | ❓ | REV | Get timeline of related knowledge ordere |
| GET | `/api/v1/graph/path` | ❓ | REV | Get shortest path between two knowledge  |

### Inbox (11 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/inbox-items` | ❓ | REV | List inbox items for the current tenant |
| POST | `/api/v1/inbox-items` | ❓ | REV | Create a new inbox item |
| DELETE | `/api/v1/inbox-items/{inboxItemId}` | ❓ | REV | Delete an inbox item |
| GET | `/api/v1/inbox-items/{inboxItemId}` | ❓ | REV | Get inbox item by identifier |
| PATCH | `/api/v1/inbox-items/{inboxItemId}` | ❓ | REV | Update inbox item status |
| GET | `/api/v1/inbox-items/{inboxItemId}/attachments` | ❓ | REV | List attachments for an inbox item |
| POST | `/api/v1/inbox-items/{inboxItemId}/attachments` | ❓ | REV | Create file attachment for inbox item |
| GET | `/api/v1/inbox-items/{inboxItemId}/attachments/{attachmentId}` | ❓ | REV | Download inbox attachment |
| POST | `/api/v1/inbox-items/{inboxItemId}/convert` | ❓ | REV | Convert inbox item to knowledge item |
| POST | `/api/v1/inbox-items/{inboxItemId}/convert-with-merge` | ❓ | REV | Convert inbox item by merging with exist |
| POST | `/api/v1/inbox-items/batch-convert` | ❓ | REV | Batch convert inbox items to knowledge i |

### Ingestion (16 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/ingestion/messages/stats` | ✅ | KEEP |  |
| GET | `/api/v1/ingestion/sources` | ✅ | KEEP |  |
| DELETE | `/api/v1/ingestion/sources/{id}` | ✅ | KEEP |  |
| GET | `/api/v1/ingestion/sources/{id}` | ✅ | KEEP |  |
| POST | `/api/v1/ingestion/sources/{id}/activate` | ✅ | KEEP |  |
| POST | `/api/v1/ingestion/sources/{id}/deactivate` | ✅ | KEEP |  |
| POST | `/api/v1/ingestion/sources/email` | ✅ | KEEP |  |
| GET | `/api/v1/ingestion/sources/email/{id}` | ✅ | KEEP |  |
| PUT | `/api/v1/ingestion/sources/email/{id}` | ✅ | KEEP |  |
| POST | `/api/v1/ingestion/sources/email/{id}/test` | ✅ | KEEP |  |
| POST | `/api/v1/ingestion/sources/sms` | ✅ | KEEP |  |
| GET | `/api/v1/ingestion/sources/sms/{id}` | ✅ | KEEP |  |
| PUT | `/api/v1/ingestion/sources/sms/{id}` | ✅ | KEEP |  |
| POST | `/api/v1/ingestion/sources/webhook` | ✅ | KEEP |  |
| GET | `/api/v1/ingestion/sources/webhook/{id}` | ✅ | KEEP |  |
| PUT | `/api/v1/ingestion/sources/webhook/{id}` | ✅ | KEEP |  |

### InternalEnrichment (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/internal/enrichment/complete` | ⚠️ | REV | Notify clients that enrichment is comple |
| POST | `/api/internal/enrichment/failed` | ⚠️ | REV | Notify clients that enrichment failed |
| POST | `/api/internal/enrichment/notify` | ⚠️ | REV | Notify clients of enrichment progress |

### Knowledge (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/knowledge` | ✅ | KEEP | Create a new knowledge item |
| GET | `/api/v1/knowledge/{guidId}/status` | ✅ | KEEP |  |
| GET | `/api/v1/knowledge/{id}/versions` | ✅ | KEEP |  |
| POST | `/api/v1/knowledge/check-similarity` | ✅ | KEEP | Check for similar existing knowledge ite |
| POST | `/api/v1/knowledge/quick` | ✅ | KEEP |  |

### Knowledge Chat Actions (4 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/knowledge/{knowledgeId}/chat-actions/execute/{proposalId}` | ✅ | KEEP | Execute a previously validated chat acti |
| POST | `/api/v1/knowledge/{knowledgeId}/chat-actions/reject/{proposalId}` | ✅ | KEEP | Reject a pending chat action proposal |
| POST | `/api/v1/knowledge/{knowledgeId}/chat-actions/validate` | ✅ | KEEP | Validate a chat-proposed action without  |
| POST | `/api/v1/knowledge/{knowledgeId}/chat-context` | ✅ | KEEP | Build chat context for a specific knowle |

### Knowz.API (192 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/info` | ❓ | REV |  |
| POST | `/api/v1/analyze/project` | ❓ | REV | Perform comprehensive project/codebase a |
| GET | `/api/v1/api-keys` | ❓ | REV |  |
| POST | `/api/v1/api-keys` | ❓ | REV |  |
| DELETE | `/api/v1/api-keys/{id}` | ❓ | REV |  |
| GET | `/api/v1/api-keys/{id}/reveal` | ❓ | REV |  |
| PUT | `/api/v1/api-keys/{id}/toggle` | ❓ | REV |  |
| DELETE | `/api/v1/attachments/{attachmentGuidId}` | ❓ | REV |  |
| PUT | `/api/v1/attachments/{attachmentGuidId}` | ❓ | REV |  |
| GET | `/api/v1/auth/current` | ❓ | REV |  |
| POST | `/api/v1/auth/logout` | ❓ | REV |  |
| POST | `/api/v1/auth/refresh` | ❓ | REV |  |
| GET | `/api/v1/custom-entities` | ❓ | REV |  |
| POST | `/api/v1/custom-entities` | ❓ | REV |  |
| DELETE | `/api/v1/custom-entities/{id}` | ❓ | REV |  |
| GET | `/api/v1/custom-entities/{id}` | ❓ | REV |  |
| PUT | `/api/v1/custom-entities/{id}` | ❓ | REV |  |
| GET | `/api/v1/custom-entity-types` | ❓ | REV |  |
| POST | `/api/v1/custom-entity-types` | ❓ | REV |  |
| DELETE | `/api/v1/custom-entity-types/{id}` | ❓ | REV |  |
| GET | `/api/v1/custom-entity-types/{id}` | ❓ | REV |  |
| PUT | `/api/v1/custom-entity-types/{id}` | ❓ | REV |  |
| GET | `/api/v1/entities/duplicates` | ❓ | REV |  |
| GET | `/api/v1/events` | ❓ | REV |  |
| POST | `/api/v1/events` | ❓ | REV |  |
| DELETE | `/api/v1/events/{eventId}/knowledge/{knowledgeId}` | ❓ | REV |  |
| POST | `/api/v1/events/{eventId}/knowledge/{knowledgeId}` | ❓ | REV |  |
| DELETE | `/api/v1/events/{id}` | ❓ | REV |  |
| GET | `/api/v1/events/{id}` | ❓ | REV |  |
| PUT | `/api/v1/events/{id}` | ❓ | REV |  |
| GET | `/api/v1/events/{id}/knowledge` | ❓ | REV |  |
| POST | `/api/v1/events/merge` | ❓ | REV |  |
| POST | `/api/v1/events/merge/{primaryId}/{secondaryId}` | ❓ | REV |  |
| POST | `/api/v1/expand-query` | ❓ | REV | Test query expansion with synonyms |
| PUT | `/api/v1/files/{fileRecordId}/indexing` | ❓ | REV |  |
| POST | `/api/v1/files/{fileRecordId}/process-now` | ❓ | REV |  |
| POST | `/api/v1/files/{fileRecordId}/reprocess` | ❓ | REV |  |
| POST | `/api/v1/files/{fileRecordId}/test-set-extracted-text` | ❓ | REV | TEST ONLY: Set extractedText on a FileRe |
| GET | `/api/v1/files/{fileRecordId}/transcript` | ❓ | REV |  |
| GET | `/api/v1/files/{fileRecordId}/transcription-status` | ❓ | REV |  |
| POST | `/api/v1/files/test-create-with-extracted-text` | ❓ | REV | TEST ONLY: Create complete test document |
| DELETE | `/api/v1/files/upload/{uploadId}` | ❓ | REV |  |
| GET | `/api/v1/files/upload/{uploadId}/progress` | ❓ | REV |  |
| POST | `/api/v1/files/upload/complete` | ❓ | REV |  |
| POST | `/api/v1/files/upload/initialize` | ❓ | REV |  |
| POST | `/api/v1/files/upload/streaming` | ❓ | REV |  |
| GET | `/api/v1/filesystem/file/{fileId}` | ❓ | REV |  |
| GET | `/api/v1/filesystem/folders` | ❓ | REV |  |
| POST | `/api/v1/filesystem/search` | ❓ | REV |  |
| GET | `/api/v1/filesystem/structure` | ❓ | REV |  |
| GET | `/api/v1/knowledge` | ❓ | REV |  |
| GET | `/api/v1/knowledge-item-types` | ❓ | REV |  |
| POST | `/api/v1/knowledge-item-types` | ❓ | REV |  |
| PUT | `/api/v1/knowledge-item-types/{guidId}` | ❓ | REV |  |
| POST | `/api/v1/knowledge/{guidId}/enhance` | ❓ | REV |  |
| DELETE | `/api/v1/knowledge/{id}` | ❓ | REV |  |
| GET | `/api/v1/knowledge/{id}` | ❓ | REV |  |
| PUT | `/api/v1/knowledge/{id}` | ❓ | REV |  |
| POST | `/api/v1/knowledge/{id}/confirm-update` | ❓ | REV |  |
| GET | `/api/v1/knowledge/{id}/entities` | ❓ | REV |  |
| PUT | `/api/v1/knowledge/{id}/entities` | ❓ | REV |  |
| PUT | `/api/v1/knowledge/{id}/merge` | ❓ | REV |  |
| POST | `/api/v1/knowledge/{id}/regenerate` | ❓ | REV | Trigger full AI re-enrichment including  |
| POST | `/api/v1/knowledge/{id}/regenerate-summary` | ❓ | REV | Regenerate the comprehensive AI summary  |
| POST | `/api/v1/knowledge/{id}/reindex` | ❓ | REV |  |
| POST | `/api/v1/knowledge/{id}/restore` | ❓ | REV |  |
| GET | `/api/v1/knowledge/{id}/status` | ❓ | REV |  |
| POST | `/api/v1/knowledge/{id}/suggest-improvements` | ❓ | REV |  |
| GET | `/api/v1/knowledge/{knowledgeGuid}/attachments` | ❓ | REV |  |
| POST | `/api/v1/knowledge/{knowledgeGuid}/attachments` | ❓ | REV |  |
| GET | `/api/v1/knowledge/{knowledgeGuid}/attachments/{attachmentGuid}/download` | ❓ | REV |  |
| GET | `/api/v1/knowledge/{knowledgeId}/costs` | ❓ | REV |  |
| DELETE | `/api/v1/knowledge/{knowledgeId}/tags/{tagId}` | ❓ | REV |  |
| POST | `/api/v1/knowledge/{knowledgeId}/tags/{tagId}` | ❓ | REV |  |
| POST | `/api/v1/knowledge/batch` | ❓ | REV |  |
| POST | `/api/v1/knowledge/conversational-update` | ❓ | REV |  |
| POST | `/api/v1/knowledge/fast` | ❓ | REV |  |
| GET | `/api/v1/knowledge/file` | ❓ | REV |  |
| POST | `/api/v1/knowledge/index-all` | ❓ | REV |  |
| POST | `/api/v1/knowledge/query` | ❓ | REV | Query knowledge base with enhanced expan |
| POST | `/api/v1/knowledge/reindex-all` | ❓ | REV |  |
| GET | `/api/v1/knowledge/search` | ❓ | REV |  |
| POST | `/api/v1/knowledge/search` | ❓ | REV |  |
| POST | `/api/v1/knowledge/search/chunks` | ❓ | REV |  |
| DELETE | `/api/v1/knowledge/search/clear` | ❓ | REV |  |
| GET | `/api/v1/knowledge/search/fulltext` | ❓ | REV |  |
| GET | `/api/v1/knowledge/search/keyword` | ❓ | REV |  |
| GET | `/api/v1/knowledge/search/stats` | ❓ | REV |  |
| GET | `/api/v1/knowledge/statistics` | ❓ | REV |  |
| GET | `/api/v1/locations` | ❓ | REV |  |
| POST | `/api/v1/locations` | ❓ | REV |  |
| DELETE | `/api/v1/locations/{id}` | ❓ | REV |  |
| GET | `/api/v1/locations/{id}` | ❓ | REV |  |
| PUT | `/api/v1/locations/{id}` | ❓ | REV |  |
| GET | `/api/v1/locations/{id}/knowledge` | ❓ | REV |  |
| DELETE | `/api/v1/locations/{locationId}/knowledge/{knowledgeId}` | ❓ | REV |  |
| POST | `/api/v1/locations/{locationId}/knowledge/{knowledgeId}` | ❓ | REV |  |
| POST | `/api/v1/locations/merge` | ❓ | REV |  |
| POST | `/api/v1/locations/merge/{primaryId}/{secondaryId}` | ❓ | REV |  |
| GET | `/api/v1/locations/nearby` | ❓ | REV |  |
| POST | `/api/v1/migration/apply` | ❓ | REV |  |
| GET | `/api/v1/migration/status` | ❓ | REV |  |
| GET | `/api/v1/persons` | ❓ | REV |  |
| POST | `/api/v1/persons` | ❓ | REV |  |
| DELETE | `/api/v1/persons/{id}` | ❓ | REV |  |
| GET | `/api/v1/persons/{id}` | ❓ | REV |  |
| PUT | `/api/v1/persons/{id}` | ❓ | REV |  |
| GET | `/api/v1/persons/{id}/knowledge` | ❓ | REV |  |
| DELETE | `/api/v1/persons/{personId}/knowledge/{knowledgeId}` | ❓ | REV |  |
| POST | `/api/v1/persons/{personId}/knowledge/{knowledgeId}` | ❓ | REV |  |
| POST | `/api/v1/persons/duplicates` | ❓ | REV |  |
| POST | `/api/v1/persons/merge` | ❓ | REV |  |
| POST | `/api/v1/persons/merge/{primaryId}/{secondaryId}` | ❓ | REV |  |
| POST | `/api/v1/query` | ❓ | REV | Execute an enhanced query with linear or |
| POST | `/api/v1/query/fast-research` | ❓ | REV | Fast research (2-4 second target) |
| GET | `/api/v1/query/session/{sessionId}` | ❓ | REV |  |
| POST | `/api/v1/register` | ❓ | REV |  |
| GET | `/api/v1/tags` | ❓ | REV |  |
| POST | `/api/v1/tags` | ❓ | REV |  |
| DELETE | `/api/v1/tags/{id}` | ❓ | REV |  |
| GET | `/api/v1/tags/{id}` | ❓ | REV |  |
| PUT | `/api/v1/tags/{id}` | ❓ | REV |  |
| GET | `/api/v1/tags/{id}/knowledge` | ❓ | REV |  |
| PUT | `/api/v1/tags/{id}/merge` | ❓ | REV |  |
| DELETE | `/api/v1/tags/{id}/prompt` | ❓ | REV |  |
| PUT | `/api/v1/tags/{id}/prompt` | ❓ | REV |  |
| GET | `/api/v1/tenant/costs/summary` | ❓ | REV |  |
| GET | `/api/v1/test/connection` | ❓ | REV |  |
| GET | `/api/v1/topics` | ❓ | REV |  |
| POST | `/api/v1/topics` | ❓ | REV |  |
| DELETE | `/api/v1/topics/{id}` | ❓ | REV |  |
| GET | `/api/v1/topics/{id}` | ❓ | REV |  |
| PUT | `/api/v1/topics/{id}` | ❓ | REV |  |
| GET | `/api/v1/topics/{id}/knowledge` | ❓ | REV |  |
| PUT | `/api/v1/topics/{id}/move` | ❓ | REV |  |
| GET | `/api/v1/topics/search` | ❓ | REV |  |
| DELETE | `/api/v1/transcription/job/{jobId}` | ❓ | REV |  |
| GET | `/api/v1/transcription/job/{jobId}` | ❓ | REV |  |
| GET | `/api/v1/transcription/result/{fileRecordId}` | ❓ | REV |  |
| GET | `/api/v1/transcription/speech-token` | ❓ | REV | Get Azure Speech Service authorization t |
| POST | `/api/v1/transcription/start` | ❓ | REV |  |
| GET | `/api/v1/users` | ❓ | REV |  |
| POST | `/api/v1/users` | ❓ | REV |  |
| DELETE | `/api/v1/users/{userId}` | ❓ | REV |  |
| PUT | `/api/v1/users/{userId}` | ❓ | REV |  |
| POST | `/api/v1/users/{userId}/password` | ❓ | REV |  |
| PUT | `/api/v1/users/{userId}/role` | ❓ | REV |  |
| DELETE | `/api/v1/users/api-key` | ❓ | REV |  |
| GET | `/api/v1/users/api-key` | ❓ | REV |  |
| POST | `/api/v1/users/api-key` | ❓ | REV |  |
| GET | `/api/v1/users/api-key/reveal` | ❓ | REV |  |
| GET | `/api/v1/users/me` | ❓ | REV |  |
| PUT | `/api/v1/users/me` | ❓ | REV |  |
| POST | `/api/v1/users/resend-verification` | ❓ | REV |  |
| GET | `/api/v1/users/verify-email` | ❓ | REV |  |
| GET | `/api/v1/vaults` | ❓ | REV |  |
| POST | `/api/v1/vaults` | ❓ | REV |  |
| DELETE | `/api/v1/vaults/{id}` | ❓ | REV |  |
| GET | `/api/v1/vaults/{id}` | ❓ | REV |  |
| PUT | `/api/v1/vaults/{id}` | ❓ | REV |  |
| PUT | `/api/v1/vaults/{id}/default` | ❓ | REV |  |
| GET | `/api/v1/vaults/{id}/knowledge` | ❓ | REV |  |
| DELETE | `/api/v1/vaults/{id}/prompt` | ❓ | REV |  |
| PUT | `/api/v1/vaults/{id}/prompt` | ❓ | REV |  |
| GET | `/api/v1/vaults/{id}/prompt-context` | ❓ | REV |  |
| GET | `/api/v1/vaults/{id}/sms` | ❓ | REV |  |
| POST | `/api/v1/vaults/{id}/sms/disable` | ❓ | REV |  |
| POST | `/api/v1/vaults/{id}/sms/enable` | ❓ | REV |  |
| GET | `/api/v1/vaults/{id}/tags` | ❓ | REV |  |
| POST | `/api/v1/vaults/{id}/tags` | ❓ | REV |  |
| DELETE | `/api/v1/vaults/{id}/tags/{tagId}` | ❓ | REV |  |
| POST | `/api/v1/vaults/{targetVaultId}/move-knowledge` | ❓ | REV |  |
| GET | `/api/v1/vaults/{vaultGuid}/knowledge-item-types` | ❓ | REV |  |
| GET | `/api/v1/vaults/{vaultId}/costs` | ❓ | REV |  |
| POST | `/api/v1/vaults/{vaultId}/entities` | ❓ | REV |  |
| DELETE | `/api/v1/vaults/{vaultId}/entities/{entityId}` | ❓ | REV |  |
| POST | `/api/v1/vaults/{vaultId}/entities/{entityId}` | ❓ | REV |  |
| DELETE | `/api/v1/vaults/{vaultId}/git-config` | ❓ | REV |  |
| GET | `/api/v1/vaults/{vaultId}/git-config` | ❓ | REV |  |
| POST | `/api/v1/vaults/{vaultId}/git-config` | ❓ | REV |  |
| POST | `/api/v1/vaults/{vaultId}/git-import` | ❓ | REV |  |
| POST | `/api/v1/vaults/{vaultId}/upload-zip` | ❓ | REV |  |
| POST | `/api/v1/versioning/enable` | ❓ | REV |  |
| GET | `/health` | ❓ | REV |  |
| GET | `/health/authenticated` | ❓ | REV |  |
| GET | `/health/database` | ❓ | REV |  |
| GET | `/health/detailed` | ❓ | REV |  |
| GET | `/health/ffmpeg` | ❓ | REV |  |
| GET | `/health/live` | ❓ | REV |  |
| GET | `/health/metrics` | ❓ | REV |  |
| GET | `/health/ready` | ❓ | REV |  |
| GET | `/health/services` | ❓ | REV |  |

### MCP Protocol (6 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/mcp/initialize` | ✅ | KEEP | Handles MCP initialize request - returns |
| POST | `/api/v1/mcp/prompts/list` | ✅ | KEEP | Handles prompts/list request - returns a |
| POST | `/api/v1/mcp/resources/list` | ✅ | KEEP | Handles resources/list request - returns |
| POST | `/api/v1/mcp/resources/read` | ✅ | KEEP | Handles resources/read request - reads a |
| POST | `/api/v1/mcp/tools/call` | ✅ | KEEP | Handles tools/call request - executes a  |
| POST | `/api/v1/mcp/tools/list` | ✅ | KEEP | Handles tools/list request - returns all |

### Personas (8 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/personas` | ❓ | REV | List all personas for tenant |
| POST | `/api/v1/personas` | ❓ | REV | Create a new chat persona |
| DELETE | `/api/v1/personas/{id}` | ❓ | REV | Delete a persona (cannot delete default) |
| GET | `/api/v1/personas/{id}` | ❓ | REV | Get persona by ID |
| PUT | `/api/v1/personas/{id}` | ❓ | REV | Update an existing persona |
| POST | `/api/v1/personas/{id}/clone` | ❓ | REV | Clone a persona with a new name |
| POST | `/api/v1/personas/{id}/preview` | ❓ | REV | Preview rendered persona with variables |
| POST | `/api/v1/personas/{id}/set-default` | ❓ | REV | Set persona as tenant default |

### Perspective (9 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/perspectives/{perspectiveId}/regenerate` | ❓ | REV | Regenerate a perspective |
| POST | `/api/v1/perspectives/batch-generate` | ❓ | REV | Batch generate perspectives for multiple |
| GET | `/api/v1/perspectives/definitions` | ❓ | REV | Get all perspective definitions for the  |
| POST | `/api/v1/perspectives/definitions` | ❓ | REV | Create a new perspective definition |
| DELETE | `/api/v1/perspectives/definitions/{id}` | ❓ | REV | Delete a perspective definition |
| PUT | `/api/v1/perspectives/definitions/{id}` | ❓ | REV | Update a perspective definition |
| GET | `/api/v1/perspectives/definitions/active` | ❓ | REV | Get active perspective definitions for t |
| POST | `/api/v1/perspectives/generate/{knowledgeId}` | ❓ | REV | Generate perspectives for a knowledge it |
| GET | `/api/v1/perspectives/knowledge/{knowledgeId}` | ❓ | REV | Get perspectives for a knowledge item |

### Perspective Definitions (6 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/prompts/perspectives` | ❓ | REV |  |
| POST | `/api/v1/prompts/perspectives` | ❓ | REV |  |
| DELETE | `/api/v1/prompts/perspectives/{id}` | ❓ | REV |  |
| GET | `/api/v1/prompts/perspectives/{id}` | ❓ | REV |  |
| PUT | `/api/v1/prompts/perspectives/{id}` | ❓ | REV |  |
| GET | `/api/v1/prompts/perspectives/active` | ❓ | REV |  |

### PhoneVerification (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/user/phone/send-code` | ❓ | REV | Send verification code to the specified  |
| GET | `/api/v1/user/phone/status` | ❓ | REV | Get the current phone verification statu |
| POST | `/api/v1/user/phone/verify-code` | ❓ | REV | Verify the phone number using the receiv |

### Processing Rules (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/prompts/rules` | ❓ | REV |  |
| POST | `/api/v1/prompts/rules` | ❓ | REV |  |
| DELETE | `/api/v1/prompts/rules/{id}` | ❓ | REV |  |
| GET | `/api/v1/prompts/rules/{id}` | ❓ | REV |  |
| PUT | `/api/v1/prompts/rules/{id}` | ❓ | REV |  |

### ProcessingRules (6 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/processing-rules` | ❓ | REV |  |
| POST | `/api/v1/processing-rules` | ❓ | REV |  |
| DELETE | `/api/v1/processing-rules/{id}` | ❓ | REV |  |
| GET | `/api/v1/processing-rules/{id}` | ❓ | REV |  |
| PUT | `/api/v1/processing-rules/{id}` | ❓ | REV |  |
| GET | `/api/v1/processing-rules/by-trigger/{trigger}` | ❓ | REV |  |

### Prompts (6 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/prompts` | ❓ | REV | Get all prompts |
| DELETE | `/api/v1/prompts/{key}` | ❓ | REV | Reset prompt to default |
| GET | `/api/v1/prompts/{key}` | ❓ | REV | Get specific prompt |
| PUT | `/api/v1/prompts/{key}` | ❓ | REV | Update prompt |
| POST | `/api/v1/prompts/{key}/test` | ❓ | REV | Test prompt |
| GET | `/api/v1/prompts/keys` | ❓ | REV | Get available prompt keys |

### Public Sites (12 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/public/site` | ❓ | REV | Get public site by subdomain |
| GET | `/api/v1/public/sites/{slug}` | ❓ | REV | Get public site by slug |
| POST | `/api/v1/public/sites/{slug}/submissions/{submissionId}/resend` | ❓ | REV | Resend verification code |
| GET | `/api/v1/public/sites/{slug}/submissions/{submissionId}/status` | ❓ | REV | Get submission status |
| POST | `/api/v1/public/sites/{slug}/submissions/{submissionId}/verify` | ❓ | REV | Verify submission with OTP |
| POST | `/api/v1/public/sites/{slug}/submit` | ❓ | REV | Submit content to public site |
| DELETE | `/api/v1/public/sites/{slug}/upload/{uploadId}` | ❓ | REV | Cancel upload |
| POST | `/api/v1/public/sites/{slug}/upload/{uploadId}/chunk` | ❓ | REV | Upload file chunk |
| GET | `/api/v1/public/sites/{slug}/upload/{uploadId}/progress` | ❓ | REV | Get upload progress |
| POST | `/api/v1/public/sites/{slug}/upload/complete` | ❓ | REV | Complete public file upload |
| POST | `/api/v1/public/sites/{slug}/upload/initialize` | ❓ | REV | Initialize public file upload |
| POST | `/api/v1/public/sites/{slug}/verify/initiate` | ❓ | REV | Initiate verification before submission |

### Query (1 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/query/temporal` | ❓ | REV |  |

### QuestionStatus (2 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/knowledge/{knowledgeItemId}/question-status` | ❓ | REV | Get question status for a knowledge item |
| PUT | `/api/v1/knowledge/{knowledgeItemId}/question-status` | ❓ | REV | Update question status for a knowledge i |

### Site Submissions (8 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/submissions` | ❓ | REV | List site submissions |
| DELETE | `/api/v1/submissions/{id}` | ❓ | REV | Delete a submission |
| GET | `/api/v1/submissions/{id}` | ❓ | REV | Get submission by ID |
| POST | `/api/v1/submissions/{id}/approve` | ❓ | REV | Approve a submission |
| POST | `/api/v1/submissions/{id}/reject` | ❓ | REV | Reject a submission |
| POST | `/api/v1/submissions/bulk/approve` | ❓ | REV | Bulk approve submissions |
| POST | `/api/v1/submissions/bulk/delete` | ❓ | REV | Bulk delete submissions |
| POST | `/api/v1/submissions/bulk/reject` | ❓ | REV | Bulk reject submissions |

### SmsWebhook (1 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/sms/inbound` | ❓ | REV | Twilio inbound SMS webhook endpoint.
Rec |

### SuperAdminAuth (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/superadmin/auth/login` | ✅ | KEEP | Authenticate with super admin passphrase |
| POST | `/api/v1/superadmin/auth/logout` | ✅ | KEEP | Logout and clear super admin session. |
| GET | `/api/v1/superadmin/auth/status` | ✅ | KEEP | Check super admin session status. |

### SuperAdminDiagnostics (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/superadmin/diagnostics/costs` | ⚠️ | REV | Get AI cost breakdown across all tenants |
| GET | `/api/v1/superadmin/diagnostics/logs` | ⚠️ | REV | Get diagnostic logs across all tenants w |
| GET | `/api/v1/superadmin/diagnostics/stats` | ⚠️ | REV | Get aggregated statistics across all ten |
| GET | `/api/v1/superadmin/diagnostics/tenants` | ⚠️ | REV | Get list of tenants with their usage sum |
| GET | `/api/v1/superadmin/diagnostics/trends` | ⚠️ | REV | Get daily usage trends for charting. |

### SuperAdminEmails (1 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/superadmin/test-email` | ⚠️ | REV | Send a test email to verify email servic |

### SuperAdminImpersonation (7 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/superadmin/impersonation/current` | ⚠️ | REV |  |
| POST | `/api/v1/superadmin/impersonation/end` | ⚠️ | REV |  |
| POST | `/api/v1/superadmin/impersonation/end/{sessionId}` | ⚠️ | REV |  |
| GET | `/api/v1/superadmin/impersonation/session/{sessionId}` | ⚠️ | REV |  |
| GET | `/api/v1/superadmin/impersonation/sessions` | ⚠️ | REV |  |
| GET | `/api/v1/superadmin/impersonation/sessions/user/{userId}` | ⚠️ | REV |  |
| POST | `/api/v1/superadmin/impersonation/start/{userId}` | ⚠️ | REV |  |

### SuperAdminIndexes (12 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/superadmin/indexes/pipeline-jobs` | ⚠️ | REV | Get recent pipeline processing jobs acro |
| GET | `/api/v1/superadmin/indexes/pipeline-jobs/{knowledgeId}` | ⚠️ | REV | Get processing details for a specific kn |
| POST | `/api/v1/superadmin/indexes/pipeline-jobs/{knowledgeId}/retry` | ⚠️ | REV | Retry processing for a failed knowledge  |
| GET | `/api/v1/superadmin/indexes/queue-status` | ⚠️ | REV | Get Service Bus queue status. |
| POST | `/api/v1/superadmin/indexes/reindex-all` | ⚠️ | REV | Reindex all knowledge for all tenants. |
| POST | `/api/v1/superadmin/indexes/reindex-tenant/{tenantId}` | ⚠️ | REV | Reindex all knowledge for a specific ten |
| POST | `/api/v1/superadmin/indexes/reindex-vault/{tenantId}/{vaultId}` | ⚠️ | REV | Reindex a specific vault within a tenant |
| POST | `/api/v1/superadmin/indexes/reprocess-deadletter/{queueName}` | ⚠️ | REV | Clear dead-letter queue messages by resu |
| GET | `/api/v1/superadmin/indexes/status` | ⚠️ | REV | Get index status for all tenants. |
| GET | `/api/v1/superadmin/indexes/tenant/{tenantId}` | ⚠️ | REV | Get detailed index information for a spe |
| GET | `/api/v1/superadmin/indexes/thumbnails/{tenantId}` | ⚠️ | REV | Get thumbnail processing status for a te |
| POST | `/api/v1/superadmin/indexes/thumbnails/regenerate/{tenantId}` | ⚠️ | REV | Regenerate thumbnails for files missing  |

### SuperAdminModels (13 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/superadmin/models/deployments` | ⚠️ | REV | Get all model deployments. |
| POST | `/api/v1/superadmin/models/deployments` | ⚠️ | REV | Create a new model deployment. |
| DELETE | `/api/v1/superadmin/models/deployments/{deploymentId}` | ⚠️ | REV | Delete a model deployment. |
| GET | `/api/v1/superadmin/models/deployments/{deploymentId}` | ⚠️ | REV | Get a model deployment by ID. |
| PATCH | `/api/v1/superadmin/models/deployments/{deploymentId}` | ⚠️ | REV | Update a model deployment. |
| POST | `/api/v1/superadmin/models/deployments/{deploymentId}/test` | ⚠️ | REV | Test a model deployment with a simple ch |
| GET | `/api/v1/superadmin/models/global-config` | ⚠️ | REV | Get all global model configurations. |
| PUT | `/api/v1/superadmin/models/global-config` | ⚠️ | REV | Create or update a global model configur |
| GET | `/api/v1/superadmin/models/tiers` | ⚠️ | REV | Get all model tiers. |
| POST | `/api/v1/superadmin/models/tiers` | ⚠️ | REV | Create a new model tier. |
| DELETE | `/api/v1/superadmin/models/tiers/{tierId}` | ⚠️ | REV | Delete a model tier. |
| GET | `/api/v1/superadmin/models/tiers/{tierId}` | ⚠️ | REV | Get a model tier by ID. |
| PATCH | `/api/v1/superadmin/models/tiers/{tierId}` | ⚠️ | REV | Update a model tier. |

### SuperAdminPhoneNumbers (6 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/superadmin/phone-numbers` | ⚠️ | REV | Get all phone numbers in the pool. |
| POST | `/api/v1/superadmin/phone-numbers` | ⚠️ | REV | Add a new phone number to the pool. |
| DELETE | `/api/v1/superadmin/phone-numbers/{id}` | ⚠️ | REV | Delete a phone number from the pool (sof |
| GET | `/api/v1/superadmin/phone-numbers/{id}` | ⚠️ | REV | Get a specific phone number by ID. |
| PUT | `/api/v1/superadmin/phone-numbers/{id}` | ⚠️ | REV | Update an existing phone number in the p |
| POST | `/api/v1/superadmin/phone-numbers/{id}/test-sms` | ⚠️ | REV | Send a test SMS using a platform phone n |

### SuperAdminPlatformDefaults (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/superadmin/platform-defaults` | ⚠️ | REV | Get platform-wide default feature flags |
| PUT | `/api/v1/superadmin/platform-defaults` | ⚠️ | REV | Update platform-wide default feature fla |
| GET | `/api/v1/superadmin/platform-defaults/definitions` | ⚠️ | REV | Get feature flag definitions with descri |

### SuperAdminSites (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/superadmin/sites` | ⚠️ | REV | Get all customer sites across all tenant |
| POST | `/api/v1/superadmin/sites` | ⚠️ | REV | Create a new site for a tenant (super ad |
| DELETE | `/api/v1/superadmin/sites/{id}` | ⚠️ | REV | Delete a site (soft delete, super admin  |
| GET | `/api/v1/superadmin/sites/{id}` | ⚠️ | REV | Get a specific site by ID with tenant in |
| PUT | `/api/v1/superadmin/sites/{id}` | ⚠️ | REV | Update site (publish/unpublish, set cust |

### SuperAdminSms (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/superadmin/sms/assign` | ⚠️ | REV | Assign a phone number to a tenant. |
| GET | `/api/v1/superadmin/sms/assignments` | ⚠️ | REV | Get all SMS phone number assignments. |
| POST | `/api/v1/superadmin/sms/unassign/{phoneNumberId}` | ⚠️ | REV | Unassign a phone number from its current |

### SuperAdminTenantFlags (4 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/superadmin/tenants/{tenantId}/flags/effective` | ⚠️ | REV | Get effective feature flags for a tenant |
| DELETE | `/api/v1/superadmin/tenants/{tenantId}/flags/overrides` | ⚠️ | REV | Delete tenant-specific overrides (tenant |
| GET | `/api/v1/superadmin/tenants/{tenantId}/flags/overrides` | ⚠️ | REV | Get tenant-specific feature flag overrid |
| PUT | `/api/v1/superadmin/tenants/{tenantId}/flags/overrides` | ⚠️ | REV | Set or update tenant-specific feature fl |

### SuperAdminTenants (8 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/superadmin/tenants` | ⚠️ | REV | Get all tenants with statistics. |
| POST | `/api/v1/superadmin/tenants` | ⚠️ | REV | Create a new tenant (super admin only). |
| DELETE | `/api/v1/superadmin/tenants/{id}` | ⚠️ | REV | Delete a tenant (soft delete/deactivate, |
| GET | `/api/v1/superadmin/tenants/{id}` | ⚠️ | REV | Get a specific tenant by ID with full st |
| PUT | `/api/v1/superadmin/tenants/{id}` | ⚠️ | REV | Update tenant settings. |
| POST | `/api/v1/superadmin/tenants/{id}/hard-delete` | ⚠️ | REV | Hard delete a tenant with complete clean |
| POST | `/api/v1/superadmin/tenants/bulk-hard-delete` | ⚠️ | REV | Bulk hard delete multiple tenants with c |
| GET | `/api/v1/superadmin/tenants/lookup` | ⚠️ | REV | Get all tenants for dropdown lookup. |

### SuperAdminUsers (8 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/superadmin/users` | ✅ | KEEP | Get all users across all tenants with fi |
| POST | `/api/v1/superadmin/users` | ✅ | KEEP | Create a new user for a tenant (super ad |
| DELETE | `/api/v1/superadmin/users/{id}` | ✅ | KEEP | Delete a user (soft delete, super admin  |
| GET | `/api/v1/superadmin/users/{id}` | ✅ | KEEP | Get a specific user by ID with tenant in |
| PUT | `/api/v1/superadmin/users/{id}` | ✅ | KEEP | Update user (activate/deactivate, change |
| GET | `/api/v1/superadmin/users/{id}/api-key` | ✅ | KEEP | Reveal a user's personal API key (super  |
| POST | `/api/v1/superadmin/users/{id}/reset-password` | ✅ | KEEP | Force reset a user's password (super adm |
| GET | `/api/v1/superadmin/users/search-api-key` | ✅ | KEEP | Search for user by email and reveal thei |

### System Prompts (6 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/system-prompts` | ❓ | REV |  |
| POST | `/api/v1/system-prompts` | ❓ | REV |  |
| DELETE | `/api/v1/system-prompts/{id}` | ❓ | REV |  |
| GET | `/api/v1/system-prompts/{id}` | ❓ | REV |  |
| PUT | `/api/v1/system-prompts/{id}` | ❓ | REV |  |
| GET | `/api/v1/system-prompts/active` | ❓ | REV |  |

### TemporalContext (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/knowledge/{knowledgeId}/temporal-contexts` | ❓ | REV | Get all temporal contexts for a knowledg |
| POST | `/api/v1/knowledge/{knowledgeId}/temporal-contexts` | ❓ | REV | Create a new temporal context for a know |
| DELETE | `/api/v1/knowledge/{knowledgeId}/temporal-contexts/{contextId}` | ❓ | REV | Delete a temporal context |
| GET | `/api/v1/knowledge/{knowledgeId}/temporal-contexts/{contextId}` | ❓ | REV | Get a specific temporal context |
| PUT | `/api/v1/knowledge/{knowledgeId}/temporal-contexts/{contextId}` | ❓ | REV | Update a temporal context |

### TemporalContextSearch (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/temporal-contexts/by-date` | ✅ | KEEP | Search for temporal contexts relevant to |
| GET | `/api/v1/temporal-contexts/by-range` | ✅ | KEEP | Search for temporal contexts within a da |
| GET | `/api/v1/temporal-contexts/recurring` | ✅ | KEEP | Search for recurring temporal contexts b |

### Tenant (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| DELETE | `/api/v1/tenants/{tenantId}` | ❓ | REV | Delete a tenant and all associated data |
| GET | `/api/v1/tenants/{tenantId}` | ❓ | REV | Get tenant details by ID |
| GET | `/api/v1/tenants/{tenantId}/cleanup` | ❓ | REV | Get cleanup summary for a tenant (dry ru |
| POST | `/api/v1/tenants/{tenantId}/cleanup` | ❓ | REV | Perform cleanup of all tenant data |
| POST | `/api/v1/tenants/{tenantId}/restore` | ❓ | REV | Restore a soft-deleted tenant and all as |

### Tenant Invitations (8 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/invitations` | ❓ | REV | Create an invitation to join a tenant |
| DELETE | `/api/v1/invitations/{invitationId}` | ❓ | REV | Revoke a pending invitation (admin only) |
| POST | `/api/v1/invitations/{invitationId}/resend` | ❓ | REV | Resend a pending invitation email |
| GET | `/api/v1/invitations/my-invitations` | ❓ | REV | Get pending invitations for current user |
| GET | `/api/v1/invitations/pending` | ❓ | REV | Get pending invitations for current tena |
| GET | `/api/v1/invitations/token/{token}` | ❓ | REV | Get invitation details by token (public  |
| POST | `/api/v1/invitations/token/{token}/accept` | ❓ | REV | Accept an invitation (requires authentic |
| POST | `/api/v1/invitations/token/{token}/decline` | ❓ | REV | Decline an invitation |

### Tenant Isolation (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/tenant/check-provisioning-status` | ❓ | REV |  |
| GET | `/api/v1/tenant/estimate-cost/{tier}` | ❓ | REV |  |
| POST | `/api/v1/tenant/register-with-isolation` | ❓ | REV |  |

### Tenant Metadata (2 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/tenant/metadata` | ❓ | REV |  |
| PUT | `/api/v1/tenant/metadata` | ❓ | REV |  |

### TenantAiContext (4 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| DELETE | `/api/v1/tenant/ai-context` | ❓ | REV | Delete the AI context for the current te |
| GET | `/api/v1/tenant/ai-context` | ❓ | REV | Get the AI context for the current tenan |
| PUT | `/api/v1/tenant/ai-context` | ❓ | REV | Save (create or update) the AI context f |
| GET | `/api/v1/tenant/ai-context/preview` | ❓ | REV | Preview how the AI context will render a |

### TenantResources (8 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/tenant/resources` | ❓ | REV | Get current resource configuration (conn |
| DELETE | `/api/v1/tenant/resources/{resourceType}` | ❓ | REV | Clear a specific resource configuration  |
| PUT | `/api/v1/tenant/resources/database` | ❓ | REV | Configure database resource (BYOI).
Pass |
| GET | `/api/v1/tenant/resources/health` | ❓ | REV | Get health status of tenant's BYOI resou |
| GET | `/api/v1/tenant/resources/health/history` | ❓ | REV | Get health check history for tenant's BY |
| PUT | `/api/v1/tenant/resources/search` | ❓ | REV | Configure search resource (BYOI).
Pass n |
| PUT | `/api/v1/tenant/resources/storage` | ❓ | REV | Configure storage resource (BYOI).
Pass  |
| POST | `/api/v1/tenant/resources/validate` | ❓ | REV | Validate BYOI resource configuration bef |

### TenantSmsConfig (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/tenants/sms/available-numbers` | ❓ | REV | Get available phone numbers that can be  |
| POST | `/api/v1/tenants/sms/claim` | ❓ | REV | Claim a phone number from the pool and c |
| GET | `/api/v1/tenants/sms/configuration` | ❓ | REV | Get the current SMS configuration for th |
| DELETE | `/api/v1/tenants/sms/release` | ❓ | REV | Release the claimed phone number and del |
| PUT | `/api/v1/tenants/sms/routing` | ❓ | REV | Update the SMS routing mode for the tena |

### Test (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/test/batch` | ⚠️ | REV | Send a batch of test messages |
| POST | `/api/v1/test/message` | ⚠️ | REV | Send a test message to Service Bus |
| POST | `/api/v1/test/ping` | ⚠️ | REV | Send a ping message to Service Bus |
| GET | `/api/v1/test/servicebus-diag` | ⚠️ | REV | Get Service Bus diagnostic information |
| GET | `/api/v1/test/tenant` | ⚠️ | REV | Get test tenant credentials for E2E test |

### UsageAnalytics (7 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/usage/dashboard` | ❓ | REV | Get usage dashboard summary for the curr |
| GET | `/api/v1/usage/logs` | ❓ | REV | Get usage logs for the current tenant. |
| POST | `/api/v1/usage/resolve-model` | ❓ | REV | Resolve model for an operation (preview  |
| GET | `/api/v1/usage/summary/by-operation` | ❓ | REV | Get usage summary by operation type. |
| GET | `/api/v1/usage/summary/by-tier` | ❓ | REV | Get usage summary by model tier. |
| GET | `/api/v1/usage/tiers` | ❓ | REV | Get available model tiers (for configura |
| GET | `/api/v1/usage/total-cost` | ❓ | REV | Get total cost for the current tenant. |

### User Authentication (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/users/change-password` | ✅ | KEEP | Change password for authenticated user |
| POST | `/api/v1/users/forgot-password` | ✅ | KEEP | Request password reset email |
| POST | `/api/v1/users/login` | ✅ | KEEP | Login with username/email and password |
| POST | `/api/v1/users/register` | ✅ | KEEP | Register a new user with username and pa |
| POST | `/api/v1/users/reset-password` | ✅ | KEEP | Reset password with token |

### User Management (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/users/{userId}/permissions` | ❓ | REV |  |
| PUT | `/api/v1/users/{userId}/permissions` | ❓ | REV |  |
| DELETE | `/api/v1/users/{userId}/vaults/{vaultId}/access` | ❓ | REV |  |
| POST | `/api/v1/users/{userId}/vaults/{vaultId}/access` | ❓ | REV |  |
| POST | `/api/v1/users/{userId}/vaults/batch-access` | ❓ | REV |  |

### User SMS Preferences (3 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/user/sms-preferences` | ❓ | REV |  |
| DELETE | `/api/v1/user/sms-preferences/phone` | ❓ | REV |  |
| POST | `/api/v1/user/sms-preferences/phone` | ❓ | REV |  |

### Versioning (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/knowledge/{knowledgeId}/versions` | ❓ | REV |  |
| GET | `/api/v1/knowledge/{knowledgeId}/versions/{versionNumber}` | ❓ | REV |  |
| POST | `/api/v1/knowledge/{knowledgeId}/versions/{versionNumber}/restore` | ❓ | REV |  |
| DELETE | `/api/v1/knowledge/{knowledgeId}/versions/cleanup` | ❓ | REV |  |
| GET | `/api/v1/knowledge/{knowledgeId}/versions/compare/{fromVersion}/{toVersion}` | ❓ | REV |  |

### Versioning Configuration (2 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/versioning/config` | ❓ | REV |  |
| PUT | `/api/v1/versioning/config` | ❓ | REV |  |

### Widget (8 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/widget/chat` | ❓ | REV | Send a chat message using session token  |
| GET | `/api/v1/widget/config` | ❓ | REV | Get widget configuration (theme, greetin |
| POST | `/api/v1/widget/init` | ❓ | REV | Initialize widget session with just the  |
| POST | `/api/v1/widget/session` | ❓ | REV | Start a new chat session |
| GET | `/api/v1/widget/session/{token}` | ❓ | REV | Get session info |
| POST | `/api/v1/widget/session/{token}/end` | ❓ | REV | End a chat session |
| POST | `/api/v1/widget/session/{token}/message` | ❓ | REV | Send a message in a session |
| GET | `/api/v1/widget/session/{token}/messages` | ❓ | REV | Get message history for a session |

### WidgetKeys (8 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| GET | `/api/v1/widgets/keys` | ❓ | REV | Get all widget keys for the current tena |
| POST | `/api/v1/widgets/keys` | ❓ | REV | Create a new widget key |
| DELETE | `/api/v1/widgets/keys/{id}` | ❓ | REV | Delete a widget key |
| GET | `/api/v1/widgets/keys/{id}` | ❓ | REV | Get a specific widget key by ID |
| PUT | `/api/v1/widgets/keys/{id}` | ❓ | REV | Update an existing widget key |
| GET | `/api/v1/widgets/keys/{id}/embed` | ❓ | REV | Get embed code snippet for a widget key |
| POST | `/api/v1/widgets/keys/{id}/regenerate` | ❓ | REV | Regenerate a widget key's authentication |
| GET | `/api/v1/widgets/keys/{id}/stats` | ❓ | REV | Get widget key statistics |

### Workflow (5 endpoints)

| Method | Path | Usage | Rec | Summary |
|--------|------|-------|-----|------|
| POST | `/api/v1/workflow/{conversationId}/cancel` | ❓ | REV | Cancel an active workflow |
| POST | `/api/v1/workflow/{conversationId}/execute-next` | ❓ | REV | Execute the next step in an active workf |
| GET | `/api/v1/workflow/{conversationId}/status` | ❓ | REV | Get the status of a workflow |
| POST | `/api/v1/workflow/{conversationId}/synthesize` | ❓ | REV | Synthesize results from completed workfl |
| POST | `/api/v1/workflow/detect` | ❓ | REV | Detect if a message triggers a workflow |

