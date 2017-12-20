json.array! @scores do |score|
  user = User.find(scores.user_id)
  json.id score.id
  json.email user.email
  json.score score.value
  json.create_at score.created_at
end
