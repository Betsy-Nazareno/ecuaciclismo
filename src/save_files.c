#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
int main(int argc, char **argv) {
  // Get the path to the directory to be searched.
  char *dir_path = argv[1];

  // Open the output file.
  FILE *out_file = fopen("output.txt", "w");
  if (out_file == NULL) {
    printf("Error opening output file.\n");
    exit(1);
  }

  // Recursively search the directory for .ts and .tsx files.
  DIR *dir = opendir(dir_path);
  if (dir == NULL) {
    printf("Error opening directory.\n");
    exit(1);
  }

  struct dirent *entry;
  while ((entry = readdir(dir)) != NULL) {
    // Get the file name.
    char *file_name = entry->d_name;

    // If the file is a .ts or .tsx file, read its contents and write them to the output file.
    if (strstr(file_name, ".ts") != NULL || strstr(file_name, ".tsx") != NULL) {
      FILE *file = fopen(file_name, "r");
      if (file == NULL) {
        printf("Error opening file.\n");
        exit(1);
      }

      char line[1024];
      while (fgets(line, 1024, file) != NULL) {
        fprintf(out_file, "%s", line);
      }

      fclose(file);
    }
  }

  // Close the output file.
  fclose(out_file);

  return 0;
}
