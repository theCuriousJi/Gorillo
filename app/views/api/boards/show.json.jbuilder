# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list
json.extract! @board, :title

json.lists @board.lists do |list|
  json.id list.id
  json.title list.title
  json.board_id list.board_id
  json.ord list.ord
  json.cards list.cards
end
