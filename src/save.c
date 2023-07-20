#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>

void read_and_save_files(const char *dir_path, FILE *output_file) {
    DIR *dir;
    struct dirent *entry;
    char filepath[256];

    if ((dir = opendir(dir_path)) == NULL) {
        perror("Error opening directory");
        return;
    }

    while ((entry = readdir(dir)) != NULL) {
        if (strcmp(entry->d_name, ".") != 0 && strcmp(entry->d_name, "..") != 0) {
            snprintf(filepath, sizeof(filepath), "%s/%s", dir_path, entry->d_name);

            // Check if the entry is a directory
            DIR *subdir = opendir(filepath);
            if (subdir) {
                // Entry is a directory, so recursively read its files
                closedir(subdir);
                read_and_save_files(filepath, output_file);
            } else {
                // Entry is a file, check if it has .ts or .tsx extension
                char *extension = strrchr(entry->d_name, '.');
                if (extension && (strcmp(extension, ".ts") == 0 || strcmp(extension, ".tsx") == 0)) {
                    FILE *file = fopen(filepath, "r");
                    if (file) {
                        // Write the file name before its content
                        fprintf(output_file, "=== %s ===\n", entry->d_name);

                        char buffer[1024];
                        while (fgets(buffer, sizeof(buffer), file) != NULL) {
                            fprintf(output_file, "%s", buffer);
                        }
                        fclose(file);

                        fprintf(output_file, "\n"); // Add an empty line between files
                    } else {
                        perror("Error opening file");
                    }
                }
            }
        }
    }

    closedir(dir);
}

int main() {
    const char *source_folder = "/media/moises/Disco nuevo1/RENDER/Integradora/ProyectoFInal/ecuaciclismo/src";
    const char *output_filename = "output.txt";

    FILE *output_file = fopen(output_filename, "w");
    if (output_file) {
        read_and_save_files(source_folder, output_file);
        fclose(output_file);
        printf("Content of .ts and .tsx files in the folder and its subfolders have been saved to '%s'.\n", output_filename);
    } else {
        perror("Error creating output file");
    }

    return 0;
}

