# Get the current script's directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Navigate relative to the current script's directory
cd "$DIR/server"
npx prisma studio

