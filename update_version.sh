#!/bin/bash

VERSION_FILE="app/js/version.js"

scm_version()
{
	local short
	short=false

	if test "$1" = "--short"; then
		short=true
	fi


	# Check for git and a git repo.
	if test -z "$(git rev-parse --show-cdup 2>/dev/null)" &&
	   head=`git rev-parse --verify --short HEAD 2>/dev/null`; then

		if tag="`git describe --abbrev=0 2>/dev/null`"; then
			printf '%s' $tag
		fi

		# If we are at a tagged commit (like "v2.6.30-rc6"), we ignore
		# it, because this version is defined in the top level Makefile.
		if [ -z "`git describe --exact-match 2>/dev/null`" ]; then
			# If only the short version is requested, don't bother
			# running further git commands
			if $short; then
				echo "+"
				return
			fi
			# If we are past a tagged commit (like
			# "v2.6.30-rc5-302-g72357d5"), we pretty print it.
			if atag="`git describe 2>/dev/null`"; then
				echo "$atag" | awk -F- '{printf("-%05d-%s", $(NF-1),$(NF))}'

			# If we don't have a tag at all we print g{commitish}.
			else
				printf '%s%s' g $head
			fi
		fi


		# Is this git on svn?
		if git config --get svn-remote.svn.url >/dev/null; then
			printf -- '-svn%s' "`git svn find-rev $head`"
		fi


		# Check for uncommitted changes
		if ! git diff-index --quiet HEAD; then
			printf '%s' -dirty
		fi


		# All done with git
		return
	fi

	echo "Unknown revision"
}


res=$(scm_version)
echo "angular.module('myApp.version', []).value('version', '$res');" > $VERSION_FILE
echo "Updated $VERSION_FILE to $res"


