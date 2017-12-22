class Api::ScoresController < ApplicationController
  before_action :authenticate_user!

  def index
    scores = Score.all_scores.page(params[:page])
    render json: { total_pages: scores.total_pages, scores: scores }
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
