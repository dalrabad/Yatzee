class Score < ApplicationRecord
  belongs_to :user

  def self.all_scores
    select('value, user_id, email, scores.id')
      .joins('INNER JOIN users u on u.id = scores.user_id')
      .order(value: :desc)
  end
end
