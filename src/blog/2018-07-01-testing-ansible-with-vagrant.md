---
title: "Testing Ansible with Vagrant"
date: 2018-07-01T20:09:19+02:00

tags: [post, "Ansible", "Vagrant", "sysadmin", "automation"]
---

When writing Ansible playbooks, it makes sense to test them on vanilla systems.
This way you can ensure that what you wrote actually works and you do not
forget any prerequisites your playbook requires. A testing environment can be
set up with Vagrant easily, as described in the following post.[^reference]

<!-- more -->

By default Vagrant uses `virtualbox` as its [default
provider][default-provider]. Perhaps you would like to use a different
provider. In this case define your provider with the environment variable
`DEFAULT_VAGRANT_PROVIDER`. E.g., on Windows it makes sense to use Hyper-V
(`hyperv`) instead of VirtualBox since they do not work next to each other.

In the following, we configure a simple Debian host.

```ruby
Vagrant.configure(2) do |config|
    config.vm.box: "generic/debian9"
end
```

We then download Ansible's Vagrant Dynamic Inventory to configure Ansible hosts
through the Vagrantfile listed above automatically.

```shell
# wget https://raw.githubusercontent.com/ansible/ansible/devel/contrib/inventory/vagrant.py
# chmod +x vagrant.py
```

To list all available machines run by Vagrant you use `./vagrant.py --list
all`. As you will see in the output, these machines are grouped under
"vagrant". Thus, provided a playbook file that sets "vagrant" as its host, you
can test your playbook with

```shell
# ansible-playbook -i ./vagrant.py playbook-to-test.yml
```

[default-provider]: https://www.vagrantup.com/docs/providers/default.html
