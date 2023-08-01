#!/bin/bash
NODE_BIN_PATH=./node_modules/.bin
OUT_DIR=./src/stores/proto
API_PROTO_FILES=`find src/stores/proto/$1 -path src/stores/proto/third_party -prune -o -name "*.proto" | grep -v "^src/stores/proto/third_party"`

for proto in $API_PROTO_FILES; do
      echo compling $proto...
  		$NODE_BIN_PATH/protoc \
  		--proto_path=${OUT_DIR}  \
  		--proto_path=${OUT_DIR}/third_party \
  		--ts_out=${OUT_DIR} \
  		$proto
  		if [ $? -eq 0 ]; then
  		  echo ok.
  		fi
done