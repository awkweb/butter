# budget

Budgeting app built with [Docker](https://www.docker.com/), [Django](https://www.djangoproject.com/), and [Vue.js](https://vuejs.org/).

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
3. Create a database through `positico`

Add environment variables:

```bash
# DJANGO APP KEYS

export DJ_ENV=dev
export DJ_DB_NAME=budget # database you just created
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

# LETS ENCRYPT CERTIFICATE PATHS

export SSL_CERTIFICATE=/etc/nginx/certs/local/budget.crt
export SSL_CERTIFICATE_KEY=/etc/nginx/certs/local/budget.key
```

Add an `.env.development.local` file to the `web` directory:

```bash
VUE_APP_PLAID_ENV=sandbox
VUE_APP_PLAID_PUBLIC_KEY=5f198adbdf5da4ff3be8da6ecaad58
```

See [Environment Variables and Modes](https://cli.vuejs.org/guide/mode-and-env.html) for more.

Update `/etc/hosts` by adding:

```bash
0.0.0.0 budget.local api.budget.local www.budget.local
```

Snag the repo, start Docker, and build the containers:

```bash
> git clone https://github.com/tmm/budget.git
> cd budget
> docker-compose build
```

Apply database migrations, create superuser, and generate static files (for admin console, etc.):

```bash
> docker-compose run api python manage.py makemigrations
> docker-compose run api python manage.py migrate
> docker-compose run api python manage.py createsuperuser
> docker-compose run api python manage.py collectstatic
```

Generate a local wildcard cert by running `bash scripts/generate-wildcard-cert.sh` and entering `budget.local` for root domain. Add the generated `certs` dir to `nginx/certs`. If everything worked as planned, you should be able to `docker-compose up` and access the admin app.

```bash
> docker-compose up -d
> docker-compose ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                  PORTS                                      NAMES
6c2e871834bf        budget_nginx        "bash -c 'envsubst <…"   7 seconds ago       Up Less than a second   0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   nginx
f427d34b5351        budget_api          "uwsgi --ini uwsgi.i…"   7 seconds ago       Up 6 seconds            8000/tcp                                   api
c4be8e628d86        budget_web          "uwsgi --ini uwsgi.i…"   7 seconds ago       Up 6 seconds            5000/tcp                                   web
```

Go to the [admin site](https://api.budget/admin/oauth2_provider/application/add/) to create a new `Application` for the API to connect to.

## Creating/Updating DB Models

Whenever you make changes to a model, the database needs to be kept in sync.

```bash
> docker-compose run api python manage.py makemigrations
> docker-compose run api python manage.py migrate
```

See [Django Migrations Worflow](https://docs.djangoproject.com/en/2.0/topics/migrations/#workflow) for more info.

## Set Up Dev Tools

[Prettier](https://prettier.io/)

[Black](https://github.com/ambv/black)

## Helpful links

Docker & ECS:

+ [Take Containers From Development To Amazon ECS](https://docs.bitnami.com/aws/how-to/ecs-rds-tutorial/)
+ [Docker for Beginners](https://docker-curriculum.com)

Django REST Framework:

+ [Django OAuth Toolkit with Django REST Framework Tutorial](https://django-oauth-toolkit.readthedocs.io/en/latest/rest-framework/rest-framework.html)
+ [dry-rest-permissions](https://github.com/dbkaplan/dry-rest-permissions)

General AWS:

+ [Migrating DNS Service for a Domain](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/migrate-dns-domain-inactive.html)
+ [Configuring Amazon Route 53 to Route Traffic to an Amazon EC2 Instance](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html)

Other:

+ [Generating a production certificate with Let's Encrypt & ZeroSSL](https://zerossl.com)
+ [Certificates for localhost](https://letsencrypt.org/docs/certificates-for-localhost/)
+ [Make Chrome Accept a Self-Signed Certificate (on OSX)](https://www.accuweaver.com/2014/09/19/make-chrome-accept-a-self-signed-certificate-on-osx/)
+ [Plaid Dev Environment](https://dashboard.plaid.com/overview/development)


