React Refresh bug in tss monorepos:

https://github.com/user-attachments/assets/0332e424-1d6f-44a2-af1c-25fdca51831d

Toggle this line to make it work:

https://github.com/juliusmarminge/tss-monorepo-hmr/blob/a959ed0f5b0122488ec76b0919180c6a118eb035/packages/file-table/src/index.tsx#L48

Notice also how there's no HMR when editing a page in the package, just the app:

https://github.com/user-attachments/assets/d6c7b3fd-ce95-4d84-b447-5271dd96a7f0

