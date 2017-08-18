This is the static web site for FOSS4G2018

You can view an 'always up to date' version of any content in this repo
[https://foss4g2018.github.io/foss4g2018/](https://foss4g2018.github.io/foss4g2018/)

The live site is at [http://2018.foss4g.org](http://2018.foss4g.org). 
The live site will not always be in sync with this repo - we will push to it periodically.

To deploy changes to the live site, add an entry to your ssh config:

```
Host 2018.foss4g.org
    Hostname 2018.foss4g.org
    User ubuntu
    ForwardAgent yes 
    Port 22
    ForwardX11 no
    IdentityFile <path to your>.pem
```

Then use the deploy script:

```
./update-site.sh
```

The live site should now be updated.

Contact @timlinux if you want to make any changes to the web site.

