# List of steps to provision this VM.

sudo yum install epel-release -y
sudo su
yum install wget zip unzip vim git -y

yum install firewalld -y
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --zone=public --add-service=mysql --permanent
firewall-cmd --reload
firewall-cmd --list-services

yum install mariadb mariadb-server -y
mysql-secure-installation
cat <<EOF > create_db.sql
CREATE DATABASE fg_metrics;
CREATE USER 'fg_user'@'%' IDENTIFIED BY 'XXXXX';
GRANT ALL ON fg_metrics.* TO 'fg_user'@'%';
FLUSH PRIVILEGES;
SELECT User, Host, Password FROM mysql.user;
EOF
mysql -u root -p < create_db.sql

# Install Dotnet Core
rpm -Uvh https://packages.microsoft.com/config/rhel/7/packages-microsoft-prod.rpm
yum update
yum install aspnetcore-runtime-2.1
yum install dotnet-sdk-2.1

# App Specific Provisioning
yum install npm -y

mkdir -pv /opt/metrics
chown centos: /opt/metrics

