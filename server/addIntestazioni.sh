echo -e '\**\n * @file {}\n * @date `git log --format=%aD {} | tail -1`\n * @version 1.0\n * @author Tommaso Panozzo\n * \n * DescrizioneDelFile\n */ '|cat - {} > /tmp/out && mv /tmp/out {}



find . -name "*.js" -exec sh -c " echo {}; git log --format=%aD {} | tail -1 " \;




find . -name "*.js" -exec sh -c "echo -e ' * @date '"



find . -name "*.js" -exec sh -c "echo '/**\n * @file {}\n * @date ' > /tmp/out; git log --format=%aD {} | tail -1 | cat /tmp/out - > /tmp/out2; echo '\n * @version 1.0\n * @author Tommaso Panozzo\n * \n * DescrizioneDelFile\n */ '| cat /tmp/out2 - {} > /tmp/out && mv /tmp/out {} && rm /tmp/out2" \;
