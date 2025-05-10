mkdir -p ~/rengine_backup

for vol in rengine_gf_patterns rengine_github_repos rengine_nuclei_templates rengine_ollama_data rengine_postgres_data rengine_scan_results rengine_static_volume rengine_tool_config rengine_wordlist
do
  src=$(docker volume inspect $vol -f '{{ .Mountpoint }}')
  sudo tar -czvf ~/rengine_backup/${vol}.tar.gz -C "$src" .
done
