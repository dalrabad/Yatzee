class Api::ScoresController < ApplicationController
  before_action :authenticate_user!

  def index
    @scores = Score.order(value: :desc)
  end

  def create
    score = current_user.scores.new(score_params)

    if score.save
      render json: score
    else
      render json: { errors: score.errors.join(',') }, status: 422
    end
  end

  private
    def score_params
      params.require(:score).permit(:value)
    end
end
