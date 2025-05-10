# mkdir -p ~/rengine_restore

# cd ~/rengine_restore
# for archive in /tmp/rengine_volumes/*.tar.gz
# do
#   volname=$(basename "$archive" .tar.gz)
#   docker volume create $volname
#   dest=$(docker volume inspect $volname -f '{{ .Mountpoint }}')
#   sudo tar -xzvf "$archive" -C "$dest"
# done


# overwrite existing volumes


mkdir -p ~/rengine_restore
cd ~/rengine_restore

for archive in /tmp/rengine_volumes/*.tar.gz
do
  volname=$(basename "$archive" .tar.gz)
  dest=$(docker volume inspect $volname -f '{{ .Mountpoint }}')
  echo "Overwriting volume: $volname at $dest"
  sudo tar -xzvf "$archive" -C "$dest"
done
