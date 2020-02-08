yum -y update
curl -sL https://rpm.nodesource.com/setup_13.x | bash -
yum -y install nodejs

npm install -g pm2
pm2 update

export app_root=/usr/clttsapi
if [ -d "$app_root" ];then
    rm -rf /usr/clttsapi
    mkdir -p /usr/clttsapi
else
    mkdir -p /usr/clttsapi
fi