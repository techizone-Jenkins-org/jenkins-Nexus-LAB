# Nexus Installation

####  Installation of openJDK
## Amazon Linux
```
sudo dnf update -y
sudo yum install java-17-amazon-corretto-devel -y
``` 

####  Create sonar User
```
sudo useradd -r nexus 
```
####  Give sudo permission for "sonar"  User
```
 sudo visudo
Add the below line and Save.
		nexus   ALL=(ALL)       NOPASSWD: ALL
``` 

#### Download and Install Tomcat
```
sudo wget https://download.sonatype.com/nexus/3/nexus-3.81.1-01-linux-x86_64.tar.gz -P /opt

sudo tar -xzvf nexus-3.81.1-01-linux-x86_64.tar.gz -d /opt
sudo mv /opt/nexus-3.81.1-01 /opt/nexus
ln -s /opt/nexus/bin/nexus /etc/init.d/nexus
```
#### Configure Permissions
```
chown -R nexus:nexus /opt/nexus/ 
chmod -R 775 /opt/nexus/ 
chown -R nexus:nexus  /opt/sonatype-work/ 
chmod -R 775 /opt/sonatype-work/
```
#### Nexus user configuration
```
vi /opt/nexus/bin/nexus.rc
uncomment "run_as_user" parameter and set it as following.
run_as_user="nexus"
```

#### Create Service File
**sudo vi /etc/systemd/system/nexus.service**

```
[Unit]
[Unit]
Description=nexus service
After=network.target
				
[Service]
Type=forking
LimitNOFILE=65536
ExecStart=/opt/nexus/bin/nexus start
ExecStop=/opt/nexus/bin/nexus stop
User=nexus
Restart=on-abort
				
[Install]
WantedBy=multi-user.target
```

#### Reload Systemd and enable tomcat
```
sudo systemctl daemon-reload
sudo systemctl enable nexus
sudo systemctl start nexus
```
# Nexus Configuration

Open Browser hit <IP>:8081

#### First Time Login Details
```
At First time you login, use the default username and password. 

		Default Username  ===>  admin
		Default Password saved in file  ===>   cat /opt/sonatype-work/nexus3/admin.password 
```







