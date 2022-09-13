# r2-dir-upload
Github action to upload static directory of files to Cloudflare R2

## Inputs

### `accountid`

**Required** The R2 Account ID.

### `accesskeyid`

**Required** The R2 Access Key ID.

### `secretaccesskey`

**Required** The R2 Secret Key.

### `bucket`
**Required** The R2 bucket name.

### `source`

**Required** The directory you want to upload.

### `destination`

**Optional** Destination path of the directory. Defaults to the root of the bucket.

## Example usage
```yaml
- name: R2 Directory Upload
  uses: willfurstenau/r2-dir-upload@main
  with:
    accountid: ${{ secrets.CF_ACCOUNT_ID }}
    accesskeyid: ${{ secrets.CF_ACCESS_KEY }}
    secretaccesskey: ${{ secrets.CF_SECRET_KEY }}
    bucket: ${{ secrets.R2_BUCKET }}
    source: ${{ github.workspace }}/static
    destination: /
```