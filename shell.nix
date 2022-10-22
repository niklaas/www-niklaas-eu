{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/dc075faa06323b8ab0166692f4e25cddb7b61463.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-18_x
  ];
}
