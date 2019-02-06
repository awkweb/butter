# Runbook

Just about everything you need to get going.

<details>
<summary>Set Up Local Dev Environment</summary>

## Set Up Local Dev Environment

Install tools and dependencies (via [homebrew](https://brew.sh/)):

```bash
> /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
> brew tap homebrew/bundle
> brew bundle
```

Next, create a local Postgres database:

1. Open `postgres.app` (just installed via `brew`)
2. Open `postico.app`
3. Create a database, named `wilbur`, through `positico`

Add environment variables:

```bash
# DJANGO APP KEYS

export DJ_ENV=dev
export DJ_DB_NAME=wilbur # database you just created
export DJ_DB_USER=tom # this is likely the user you use to login to your computer
export DJ_DB_PASSWORD=root
export DJ_DB_HOST=docker.for.mac.localhost # special docker set up
export DJ_DB_PORT=5432
export DJ_SECRET_KEY=+cg9iso$a55f3ay&)pdg3k&=lq_c*55j7oyuib=a(pi#2$oj^0

# PLAID APP KEYS

export PLAID_CLIENT_ID=5b9b1df200123c4672353c2c
export PLAID_PUBLIC_KEY=5f198f5da4f3be8da6ecaaadbdfd58
export PLAID_SECRET=5ea62a857d2361250eb7ed9358133c
export PLAID_ENV=sandbox

# REACT APP KEYS
export REACT_APP_NGROK_ID=1b2ee782
export REACT_APP_PLAID_ENV=sandbox
export REACT_APP_PLAID_PUBLIC_KEY=5f198adbdf5da4ff3be8da6ecaad58

# LETS ENCRYPT CERTIFICATE PATHS

export SSL_CERTIFICATE=/etc/nginx/certs/local/wilbur.crt
export SSL_CERTIFICATE_KEY=/etc/nginx/certs/local/wilbur.key
```

If `nginx/certs/local` is empty, you need to generate a self-signed certificate.

1. Go to [zerossl.com](https://zerossl.com/free-ssl/#self).
2. You should enter `wilbur.local` and `*.wilbur.local`.
3. Download the key and certificate, and rename them: `key.txt` to `wilbur.key` and `crt.txt` to `wilbur.crt`. Move the files to a `nginx/certs/local`.

Update `/etc/hosts` by adding:

```bash
0.0.0.0 wilbur.local api.wilbur.local www.wilbur.local
```

Snag the repo, start Docker, and build the containers:

```bash
> git clone https://github.com/tmm/wilbur.git
> cd wilbur
> docker-compose build
```

Apply database migrations, create superuser, and generate static files (for admin console, etc.):

```bash
> docker-compose run api python manage.py makemigrations
> docker-compose run api python manage.py migrate
> docker-compose run api python manage.py createsuperuser
> docker-compose run api python manage.py collectstatic
```

If everything worked as planned, you should be able to `docker-compose up` and access the admin app.

```bash
> docker-compose up -d
> docker-compose ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                  PORTS                                      NAMES
6c2e871834bf        wilbur_nginx        "bash -c 'envsubst <…"   7 seconds ago       Up Less than a second   0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   nginx
f427d34b5351        wilbur_api          "uwsgi --ini uwsgi.i…"   7 seconds ago       Up 6 seconds            8000/tcp                                   api
c4be8e628d86        wilbur_web          "uwsgi --ini uwsgi.i…"   7 seconds ago       Up 6 seconds            5000/tcp                                   web
```

At this point, you can check out the [admin site](https://api.wilbur.local/admin) or the actually [site](https://wilbur.local/). Chrome (or whatever browser you are using) might block you from the site. Once you [accept the self-signed certificate](https://github.com/tmm/tmm.github.io/blob/e1a673aab9fdcaa4889195db4dc1de59de123b82/blog/_posts/2018-05-21-certificates-for-localhost.md) [through keychain](https://www.accuweaver.com/2014/09/19/make-chrome-accept-a-self-signed-certificate-on-osx/), you should be all set.

</details>

<details>
<summary>Set Up Production Environment</summary>

## Set Up Production Environment

1. Create RDS Postgres instance

2. Add production environment variables to `.env`:

```bash
# DJANGO APP KEYS

export DJ_ENV=prod
export DJ_DB_NAME=something
export DJ_DB_USER=root
export DJ_DB_PASSWORD=zsRqfjJdDVAxhUewsqnTCxlslr
export DJ_DB_HOST=something.cxsbe1vrwmpg.us-east-1.rds.amazonaws.com
export DJ_DB_PORT=5432
export DJ_SECRET_KEY=+cg9iso$a55f3ay&)pdg3k&=lq_c*55j7oyuib=a(pi#2$oj^0

# PLAID APP KEYS

export PLAID_CLIENT_ID=5b9b1df200123c4672353c2c
export PLAID_PUBLIC_KEY=5f198f5da4f3be8da6ecaaadbdfd58
export PLAID_SECRET=5ea62a857d2361250eb7ed9358133c
export PLAID_ENV=sandbox

# REACT APP KEYS
export REACT_APP_NGROK_ID=1b2ee782
export REACT_APP_PLAID_ENV=sandbox
export REACT_APP_PLAID_PUBLIC_KEY=5f198adbdf5da4ff3be8da6ecaad58

# AWS IAM ACCESS KEYS

export AWS_ACCESS_KEY_ID=AKIATEMMAIEPJOZC74GP
export AWS_SECRET_ACCESS_KEY=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

# LETS ENCRYPT CERTIFICATE PATHS

export SSL_CERTIFICATE=/etc/nginx/certs/letsencrypt/name.crt
export SSL_CERTIFICATE_KEY=/etc/nginx/certs/letsencrypt/name.key
```

3. Build, tag, and push Docker images to [Amazon Elastic Container Registry](https://console.aws.amazon.com/ecs/home?region=us-east-1#/repositories)

4. Update `image` paths in `aws-compose.yml` (from now on you may use `bash scripts/push-aws-ecr.sh` to build, tag, and push all images)

5. [Create a new keypair on EC2](https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#KeyPairs:sort=keyName)

6. Add RDS's `vpc` (`--vpc vpc_id`) and `subnets` (`--subnets subnet_1,subnet_2`) to `scripts/setup-aws-ecs.sh`

7. [Configure `ecs-cli`](https://docker-curriculum.com/#aws-ecs) with cluster info by running `bash scripts/setup-aws-ecs.sh`

8. Run deploy script `bash scripts/deploy-aws-ecs.sh` ([update RDS's security group](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html#CHAP_SettingUp.SecurityGroup) to accept inbound TCP connections from ECS's security group)

If all went as planned, you can navigate to the running site. (Also, need to open up ECS security group to listen for HTTPS.)

</details>

<details>
<summary>Creating/Updating DB Models</summary>

## Creating/Updating DB Models

Whenever you make changes to a model, the database needs to be kept in sync.

```bash
> docker-compose run api python manage.py makemigrations
> docker-compose run api python manage.py migrate
```

See [Django Migrations Worflow](https://docs.djangoproject.com/en/2.0/topics/migrations/#workflow) for more info.

</details>

<details>
<summary>Testing Plaid Webhooks</summary>

## Testing [Plaid Webhooks](https://support.plaid.com/hc/en-us/articles/360008414233-Webhook-overview)

1. Install [`ngrok`](https://ngrok.com) with `brew cask install ngrok`

2. Run `ngrok http 8000` and add the `ngrok` id to the `REACT_APP_NGROK_ID` environment variable (in this case `ea1774d9`). Restart docker.

```
ngrok by @inconshreveable                                                                             (Ctrl+C to quit)

Session Status                online
Account                       tom (Plan: Free)
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://ea1774d9.ngrok.io -> localhost:8000
Forwarding                    https://ea1774d9.ngrok.io -> localhost:8000
```

3. Start a local django server running on port `8000` to receive requests from ngrok. Now any webhook coming from Plaid will forward through ngrok (`http://ea1774d9.ngrok.io`) to django (`localhost:8000`)

</details>

<details>
<summary>Tools</summary>

## Tools

All the important stuff used to power everything (in alphabetical order).

| tool                                          | description                                               |
| --------------------------------------------- | --------------------------------------------------------- |
| [Black](https://github.com/ambv/black)        | Python code formatter                                     |
| [Django](https://www.djangoproject.com/)      | Python web framework                                      |
| [Docker](https://www.docker.com/)             | Containers, etc.                                          |
| [Kitematic](https://kitematic.com/)           | The easiest way to use Docker on Mac.                     |
| [NGINX](https://www.nginx.com/)               | API Gateway, etc.                                         |
| [ngrok](https://ngrok.com)                    | Public URLs for exposing your local web server            |
| [Postgres.app](https://postgresapp.com/)      | The easiest way to get started with PostgreSQL on the Mac |
| [Postico](https://eggerapps.at/postico/)      | Modern PostgreSQL Client for the Mac                      |
| [Postman](https://www.getpostman.com/)        | API development environment                               |
| [Prettier](https://prettier.io/)              | TypeScript code formatter                                 |
| [React.js](https://reactjs.org/)              | JavaScript library for building user interfaces           |
| [tslint](https://palantir.github.io/tslint/)  | TypeScript linter                                         |
| [TypeScript](https://www.typescriptlang.org/) | Superset of JavaScript                                    |

</details>

<details>
<summary>Helpful Links</summary>

## Helpful Links

Docker & ECS:

-   [Take Containers From Development To Amazon ECS](https://docs.bitnami.com/aws/how-to/ecs-rds-tutorial/)
-   [Docker for Beginners](https://docker-curriculum.com)

Django REST Framework:

-   [Django OAuth Toolkit with Django REST Framework Tutorial](https://django-oauth-toolkit.readthedocs.io/en/latest/rest-framework/rest-framework.html)
-   [dry-rest-permissions](https://github.com/dbkaplan/dry-rest-permissions)
-   [ngrok and webhooks](https://hackernoon.com/handling-webhooks-using-django-and-ngrok-b7ff27a6fd47)

General AWS:

-   [Migrating DNS Service for a Domain](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/migrate-dns-domain-inactive.html)
-   [Configuring Amazon Route 53 to Route Traffic to an Amazon EC2 Instance](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html)

Other:

-   [Generating a production certificate with Let's Encrypt & ZeroSSL](https://zerossl.com)
-   [Certificates for localhost](https://letsencrypt.org/docs/certificates-for-localhost/)
-   [Make Chrome Accept a Self-Signed Certificate (on OSX)](https://www.accuweaver.com/2014/09/19/make-chrome-accept-a-self-signed-certificate-on-osx/)
-   [Plaid Dev Environment](https://dashboard.plaid.com/overview/development)

</details>
