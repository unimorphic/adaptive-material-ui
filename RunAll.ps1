wt -w 0 nt -d $PSScriptRoot pwsh -NoExit -Command { npm run start }
wt -w 0 nt -d "$PSScriptRoot\docs" pwsh -NoExit -Command { npm run start }
